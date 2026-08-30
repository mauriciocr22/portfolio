import { useTranslation } from "react-i18next";
import ContactList from "./ContactList";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="w-full flex flex-col items-center px-canvas-margin-mobile py-16 md:px-canvas-margin-desktop"
    >
      <SectionHeading
        title={t("contactTitle")}
        subtitle={t("contactSubtitle")}
      />
      <ContactList />
    </section>
  );
}
