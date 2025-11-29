import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CategoryInfo {
  title: string;
  description: string;
  totalItems: number;
  lastUpdate: string;
  categories: string[];
}

interface CategoryDescriptionProps {
  categoryInfo: CategoryInfo;
}

const CategoryDescription = ({ categoryInfo }: CategoryDescriptionProps) => {
  return (
    <section className="bg-white border border-border rounded-lg shadow-sm mb-8">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center">
            <Icon name="WrenchScrewdriverIcon" size={20} className="text-white" variant="solid" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">{categoryInfo.title}</h2>
            <p className="text-sm text-text-secondary">Professionelle Bau- und Landmaschinen</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <p className="text-text-secondary leading-relaxed mb-4">
              {categoryInfo.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryInfo.categories.map((category, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                  <Icon name="CheckCircleIcon" size={16} className="text-trust" variant="solid" />
                  <span className="text-sm text-text-primary font-medium">{category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-brand-primary rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CubeIcon" size={20} className="text-white" variant="solid" />
                <span className="font-medium">Verfügbare Maschinen</span>
              </div>
              <div className="text-2xl font-bold">{categoryInfo.totalItems}</div>
              <div className="text-sm opacity-90">Aktuell im Bestand</div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="ClockIcon" size={16} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">Letztes Update</span>
              </div>
              <div className="text-sm text-text-secondary">{categoryInfo.lastUpdate}</div>
            </div>

            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="DocumentCheckIcon" size={16} className="text-success" variant="solid" />
                <span className="text-sm font-medium text-success">Qualitätsprüfung</span>
              </div>
              <div className="text-xs text-text-secondary">
                Alle Maschinen werden vor Verkauf technisch geprüft und dokumentiert.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="TruckIcon" size={14} />
              <span>Abholung vor Ort</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DocumentTextIcon" size={14} />
              <span>Vollständige Dokumentation</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ShieldCheckIcon" size={14} />
              <span>Rechtssichere Verwertung</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CalendarDaysIcon" size={14} />
              <span>Besichtigung nach Termin</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryDescription;