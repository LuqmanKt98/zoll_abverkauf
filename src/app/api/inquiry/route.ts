import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendProductInquiryEmail, sendContactInquiryEmail } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, phone, message, productId, productName } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, E-Mail und Nachricht sind erforderlich.' },
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
      message,
      productId: productId || null,
      productName: productName || null,
      status: 'new',
      createdAt: serverTimestamp(),
      source: 'inquiry_form',
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'inquiries'), inquiryData);

    // Send email notification to admin
    try {
      if (productId && productName) {
        // Product inquiry
        await sendProductInquiryEmail({
          name,
          email,
          phone,
          message,
          productId,
          productName,
        });
      } else {
        // General inquiry
        await sendContactInquiryEmail({
          name,
          email,
          phone,
          message,
        });
      }
      console.log('Email notification sent successfully for inquiry:', docRef.id);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich übermittelt.',
        inquiryId: docRef.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}

