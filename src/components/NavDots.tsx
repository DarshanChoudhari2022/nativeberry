interface NavDotsProps {
  activeSection: number;
  totalSections: number;
}

const NavDots = ({ activeSection, totalSections }: NavDotsProps) => {
  return (
    <div className="nav-dots hidden md:flex">
      {Array.from({ length: totalSections }).map((_, index) => (
        <div
          key={index}
          className={`nav-dot ${activeSection === index ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

export default NavDots;
