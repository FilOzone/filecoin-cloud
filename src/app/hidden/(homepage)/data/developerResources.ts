import {
  BookOpenIcon,
  ChatsCircleIcon,
  CodeIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react/dist/ssr'

// import type { LinkCardData } from '@/components/LinkCard'

type LinkCardData = {
  title: string
  href: string
  icon: typeof BookOpenIcon
}

export const developerResources = [
  {
    title: 'Synapse SDK',
    href: '#todo',
    icon: CodeIcon,
  },
  {
    title: 'Documentation',
    href: '#todo',
    icon: BookOpenIcon,
  },
  {
    title: 'Github',
    href: '#todo',
    icon: GithubLogoIcon,
  },
  {
    title: 'Join the community',
    href: '#todo',
    icon: ChatsCircleIcon,
  },
] as const satisfies Array<LinkCardData>
