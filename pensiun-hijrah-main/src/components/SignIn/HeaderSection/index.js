import TopBackground from '../../../assets/images/top-background.svg';
import { HeaderImg, HeaderWrapper, Heading } from './HeaderElements';
import 'bootstrap/dist/css/bootstrap.css';

const HeaderSection = ({headline}) => {
  return (
    <HeaderWrapper>
      <Heading>{headline}</Heading>
      <HeaderImg src={TopBackground} />
    </HeaderWrapper>
  );
};

export default HeaderSection;
