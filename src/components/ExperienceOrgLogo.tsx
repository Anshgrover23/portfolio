import Image from 'next/image';

type ExperienceOrgLogoProps = {
  logo: string;
  company: string;
  size?: 'sm' | 'md' | 'lg';
  framed?: boolean;
};

const sizeMap = {
  sm: { box: 'h-10 w-10', dim: 40 },
  md: { box: 'h-12 w-12', dim: 48 },
  lg: { box: 'h-14 w-14', dim: 56 },
} as const;

const LOCAL_IMAGE = /\.(png|jpe?g|webp|avif|svg|gif)$/i;

export function ExperienceOrgLogo({
  logo,
  company,
  size = 'md',
  framed = false,
}: ExperienceOrgLogoProps) {
  const { box, dim } = sizeMap[size];
  const isRemote = logo.startsWith('http') || logo.startsWith('//');
  const hasImage =
    isRemote || LOCAL_IMAGE.test(logo);

  const inner = hasImage ? (
    <Image
      src={isRemote ? logo : `/${logo}`}
      alt={`${company} logo`}
      width={dim}
      height={dim}
      sizes={`${dim}px`}
      quality={90}
      className="rounded-md object-contain"
      unoptimized={isRemote || logo.endsWith('.svg')}
    />
  ) : (
    <span className="text-2xl" aria-hidden>
      {logo}
    </span>
  );

  if (framed) {
    return (
      <span
        className={`flex ${box} shrink-0 items-center justify-center overflow-hidden rounded-lg bg-transparent`}
      >
        {inner}
      </span>
    );
  }

  return (
    <span
      className={`flex ${box} shrink-0 items-center justify-center overflow-hidden rounded-lg bg-transparent`}
    >
      {inner}
    </span>
  );
}
