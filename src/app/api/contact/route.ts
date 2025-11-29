import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendContactInquiryEmail } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, phone, subject, message, inquiryType } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, E-Mail, Betreff und Nachricht sind erforderlich.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse.' },
        { status: 400 }
      );
    }

    // Create inquiry document
    const inquiryData = {
      name,
      email,
      phone: phone || '',
      subject,
      message,
      inquiryType: inquiryType || 'general',
      status: 'new',
      createdAt: serverTimestamp(),
      source: 'contact_form',
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'inquiries'), inquiryData);

    // Send email notification to admin
    try {
      await sendContactInquiryEmail({
        name,
        email,
        phone,
        message: `Betreff: ${subject}\n\n${message}`,
      });
      console.log('Email notification sent successfully for inquiry:', docRef.id);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Ihre Nachricht wurde erfolgreich übermittelt. Wir werden uns in Kürze bei Ihnen melden.',
        inquiryId: docRef.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}

