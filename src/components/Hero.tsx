'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Hero = () => {
  return (
    <section className="mb-12">
      <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white text-left tracking-tight">
            Hi, Ansh here
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Building open-source dev tools & automations{' '}
            <span className="text-red-500">📍</span>Rajasthan, India
          </p>
          <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-400/40 px-4 py-2 text-sm font-medium text-white">
            <span className=" relative inline-flex h-2 w-2 rounded-full bg-green-400 animate-ping opacity-75" />
            Open to work
          </span>
        </div>
        <Avatar className="w-20 h-20 md:w-28 md:h-28 border-2 border-border">
          <AvatarImage src="/avatar.png" alt="Ansh Grover" />
          <AvatarFallback className="text-2xl font-bold bg-muted text-foreground">
            AG
          </AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
};
