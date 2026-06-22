import {
  Activity,
  Award,
  Droplets,
  Dumbbell,
  FlaskConical,
  Gauge,
  GraduationCap,
  Ruler,
  Scale,
  ShieldCheck,
  Sun,
  Thermometer,
  Wind,
  Zap,
  type LucideProps,
} from "lucide-react";

const map = {
  Activity,
  Award,
  Droplets,
  Dumbbell,
  FlaskConical,
  Gauge,
  GraduationCap,
  Ruler,
  Scale,
  ShieldCheck,
  Sun,
  Thermometer,
  Wind,
  Zap,
} as const;

export type IconName = keyof typeof map;

/** Renderiza un icono de lucide por nombre (los iconos vienen del contenido). */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Activity;
  return <Cmp {...props} />;
}
