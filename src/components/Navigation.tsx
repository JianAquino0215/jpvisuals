import { useNavigate } from "react-router-dom";
import { StaggeredMenu } from "./StaggeredMenu";

const Navigation = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Skills', ariaLabel: 'View my skills', link: '/skills' },
    { label: 'Works', ariaLabel: 'View my works', link: '/portfolio' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Youtube', link: 'https://www.youtube.com/@Ayuu516' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/jianaquino/' },
    { label: 'Twitter', link: 'https://x.com/AyuEdits' }
  ];

  const handleNavClick = (link: string) => {
    navigate(link);
  };

  return (
    <div style={{ height: '100vh', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: 'none', overflow: 'visible' }}>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        accentColor="#5227FF"
        onItemClick={handleNavClick}
      />
    </div>
  );
};

export default Navigation;