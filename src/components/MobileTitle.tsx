import FuzzyText from "./FuzzyText";

const MobileTitle = () => {
  return (
    <div className="w-full flex justify-center" style={{ fontSize: '12rem' }}>
      <FuzzyText 
        baseIntensity={0.2} 
        hoverIntensity={0.5} 
        enableHover={true}
        fontFamily="'Midnight Gelactic', sans-serif"
        color="#87CEEB"
      >
        JianAquino
      </FuzzyText>
    </div>
  );
};

export default MobileTitle;