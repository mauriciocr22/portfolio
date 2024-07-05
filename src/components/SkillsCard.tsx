import { IconType } from "react-icons";

interface SkillsCardType {
  icon: IconType;
  iconStyle?: string;
  skillName?: string;
}

export default function SkillsCard({
  icon: Icon,
  iconStyle,
  skillName,
}: SkillsCardType) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex group bg-gradient-to-tl from-[#569b7e] via-[#23865d] to-[#218058] shadow-md shadow-green-800 rounded-md w-24 h-24 items-center justify-center mb-2">
        <Icon className={`w-16 h-16 text-white ${iconStyle}`} />
      </div>
      <span className="font-canada font-medium">{skillName}</span>
    </div>
  );
}
