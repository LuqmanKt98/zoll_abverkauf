import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CategoryInfo {
  title: string;
  description: string;
  itemTypes: string[];
  sources: string[];
  benefits: string[];
}

interface CategoryDescriptionProps {
  categoryInfo: CategoryInfo;
}

const CategoryDescription = ({ categoryInfo }: CategoryDescriptionProps) => {
  return (
    <section className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-border p-6 mb-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Main Description */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <Icon name="ArchiveBoxIcon" size={18} className="text-white" variant="solid" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">{categoryInfo.title}</h2>
          </div>
          <p className="text-text-secondary leading-relaxed mb-6">{categoryInfo.description}</p>

          {/* Item Types */}
          <div className="mb-6">
            <h3 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="TagIcon" size={16} className="text-brand-secondary" />
              <span>Verfügbare Artikeltypen</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {categoryInfo.itemTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                  <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></div>
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sources and Benefits */}
        <div className="space-y-6">
          {/* Sources */}
          <div>
            <h3 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="BuildingOfficeIcon" size={16} className="text-brand-secondary" />
              <span>Herkunft der Waren</span>
            </h3>
            <div className="space-y-2">
              {categoryInfo.sources.map((source, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                  <Icon name="ArrowRightIcon" size={14} className="text-brand-secondary mt-0.5" />
                  <span>{source}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="CheckBadgeIcon" size={16} className="text-trust" variant="solid" />
              <span>Ihre Vorteile</span>
            </h3>
            <div className="space-y-2">
              {categoryInfo.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                  <Icon name="CheckIcon" size={14} className="text-trust mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="bg-white rounded-lg p-4 border border-trust/20">
          <div className="flex items-center space-x-3">
            <Icon name="ShieldCheckIcon" size={20} className="text-trust" variant="solid" />
            <div>
              <p className="text-sm font-medium text-text-primary">Staatliche Garantie</p>
              <p className="text-xs text-text-secondary">Alle Artikel sind rechtmäßig beschlagnahmt und zur Veräußerung freigegeben</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryDescription;