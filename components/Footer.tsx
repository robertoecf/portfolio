import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PERSON } from '../content/profile';
import { SocialLinks } from './SocialLinks';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-ink text-paper scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-7 flex items-end gap-6">
          <img
            src={PERSON.portraitSmile}
            alt=""
            width={900}
            height={1349}
            loading="lazy"
            className="w-28 sm:w-36 aspect-square object-cover object-top border-2 border-paper"
          />
          <div>
            <p className="font-serif text-[48px] sm:text-[72px] leading-none">{t('footer.title')}</p>
            <p className="mt-4 text-paper/70">{t('footer.desc')}</p>
          </div>
        </div>
        <div className="md:col-span-5">
          <SocialLinks />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-paper/15 flex flex-col sm:flex-row justify-between gap-2 text-[12px] text-paper/50">
        <p>© {new Date().getFullYear()} {PERSON.displayName}</p>
        <p>{t('footer.mark')}</p>
      </div>
    </footer>
  );
};
