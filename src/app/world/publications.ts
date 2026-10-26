export interface Publication {
  volume: number;
  titleKey: string;
  descriptionKey: string;
  cover: string;
  readUrl: string;
  pdfUrl: string;
}
export const PUBLICATIONS: readonly Publication[] = [5, 4, 3, 2, 1].map(volume => ({
  volume,
  titleKey: `publication.${volume}.title`,
  descriptionKey: `publication.${volume}.description`,
  cover: `/assets/world/covers/phospho-${volume}.webp`,
  readUrl: `https://phospho${volume}.chiwutang.uk/`,
  pdfUrl: volume === 5 ? 'https://download.chiwutang.uk/Phospho5.pdf'
    : volume === 1 ? 'https://phospho1.chiwutang.uk/Phospho1.pdf'
    : `https://download.chiwutang.uk/Phospho${volume}.pdf`
}));
export interface Preview {
  id: string;
  titleKey: string;
  categoryKey: string;
  left: string;
  right: string;
}
export const PREVIEWS: readonly Preview[] = [
  { id: 'annual', titleKey: 'preview.annual.title', categoryKey: 'preview.annual.category', left: '0010', right: '0011' },
  { id: 'games', titleKey: 'preview.games.title', categoryKey: 'preview.games.category', left: '0106', right: '0107' },
  { id: 'interview', titleKey: 'preview.interview.title', categoryKey: 'preview.interview.category', left: '0166', right: '0167' }
].map(item => ({ ...item, left: `/assets/world/previews/${item.left}.webp`, right: `/assets/world/previews/${item.right}.webp` }));
export const MEMBERS = [
  { name: '阿唯', roleKey: 'team.alien' },
  { name: '木海', roleKey: 'team.muhai' },
  { name: '王二', roleKey: 'team.wanger' },
  { name: 'U.U', roleKey: 'team.uu' },
  { name: '韩雨洛', roleKey: 'team.hyl' }
];
