import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Meja Kerja', href: getPermalink('/#meja') },
    { text: 'Contoh', href: getPermalink('/#contoh') },
    { text: 'Cara Pakai', href: getPermalink('/#cara') },
    { text: 'Tanya', href: getPermalink('/#faq') },
  ],
  actions: [{ text: 'Buka Meja Kerja', href: getPermalink('/#meja') }],
};

export const footerData = {
  links: [
    {
      title: 'GraphLihat',
      links: [
        { text: 'Meja Kerja', href: getPermalink('/#meja') },
        { text: 'Contoh Graf', href: getPermalink('/#contoh') },
        { text: 'Cara Pakai', href: getPermalink('/#cara') },
        { text: 'Tanya Jawab', href: getPermalink('/#faq') },
      ],
    },
    {
      title: 'Contoh',
      links: [
        { text: 'Rendang Nenek', href: `${getPermalink('/')}?contoh=rendang#meja` },
        { text: 'Fotosintesis', href: `${getPermalink('/')}?contoh=fotosintesis#meja` },
        { text: 'Majapahit', href: `${getPermalink('/')}?contoh=majapahit#meja` },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/Kayzenn123/agent-tools-graphlihat' },
  ],
  footNote: `
    Dibuat di meja arsip, bukan di awan — datamu tidak pernah keluar dari browser ini. · GraphLihat, 2026.
  `,
};
