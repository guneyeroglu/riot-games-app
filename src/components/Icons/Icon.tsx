import RiotGamesIcon from './RiotGamesIcon';
import RiotFistIcon from './RiotFistIcon';
import WorldIcon from './WorldIcon';
import GreatBritainFlagIcon from './GreatBritainFlagIcon';
import TurkeyFlagIcon from './TurkeyFlagIcon';
import FacebookIcon from './FacebookIcon';
import TwitterIcon from './TwitterIcon';
import InstagramIcon from './InstagramIcon';
import YouTubeIcon from './YouTubeIcon';
import GitHubIcon from './GitHubIcon';
import LinkedInIcon from './LinkedInIcon';
import SearchIcon from './SearchIcon';
import CloseIcon from './CloseIcon';
import SortIcon from './SortIcon';
import FilterIcon from './FilterIcon';
import TargetIcon from './TargetIcon';
import ValorantIcon from './ValorantIcon';
import ArrowIcon from './ArrowIcon';

import { iconName } from '../../global/types/IconName';

interface IProps {
  name: iconName;
  wh?: number;
  hg?: number;
  vb?: string;
  color?: string;
}

const IconComponentName: any = {
  RiotGamesIcon: <RiotGamesIcon />,
  RiotFistIcon: <RiotFistIcon />,
  WorldIcon: <WorldIcon />,
  TRIcon: <TurkeyFlagIcon />,
  GBIcon: <GreatBritainFlagIcon />,
  FacebookIcon: <FacebookIcon />,
  TwitterIcon: <TwitterIcon />,
  InstagramIcon: <InstagramIcon />,
  YouTubeIcon: <YouTubeIcon />,
  GitHubIcon: <GitHubIcon />,
  LinkedInIcon: <LinkedInIcon />,
  SearchIcon: <SearchIcon />,
  CloseIcon: <CloseIcon />,
  SortIcon: <SortIcon />,
  FilterIcon: <FilterIcon />,
  TargetIcon: <TargetIcon />,
  ValorantIcon: <ValorantIcon />,
  ArrowIcon: <ArrowIcon />,
};

const Icon = (props: IProps) => {
  const name: iconName = props.name;
  const width: number = props.wh ?? 24;
  const height: number = props.hg ?? 24;
  const viewBox: string = props.vb ?? '0 0 24 24';
  const fill: string = props.color ?? '#ffffff';
  return (
    <svg width={width} height={height} viewBox={viewBox} fill={fill}>
      {IconComponentName[name]}
    </svg>
  );
};

export { Icon };
