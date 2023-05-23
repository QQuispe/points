// components/Header.tsx
// <img src="next.svg" alt="Logo" className="w-10 h-10 mr-2" />

const Header = () => {
    return (
      <header className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Points</h1>
        </div>
        <div className="space-x-4">
          <a href="#" className="text-gray-700">Link 1</a>
          <a href="#" className="text-gray-700">Link 2</a>
        </div>
      </header>
    );
  };
  
  export default Header;