import { Fot1, Fot2 } from "../Components/index";

export default () => {
  const footerNavs = [
    {
      href: "javascript:void()",
      name: "Terms",
    },
    {
      href: "javascript:void()",
      name: "License",
    },
    {
      href: "javascript:void()",
      name: "Privacy",
    },
    {
      href: "javascript:void()",
      name: "About us",
    },
  ];
  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        
        <div className="mt-10 py-10 border-t md:text-center">
        <div className="justify-center sm:flex">
          <div className="space-y-6">
  
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item, idx) => (
                <li className="text-gray-800 hover:text-gray-500 duration-150" key={idx}>
                  <a key={idx} href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
            <p className="py-10">
              This is an Blockchain Based Krazy... webapp for shipment management and tracking
            </p>
          <p>© 2025 Harshal Rane</p>
        </div>
      </div>
    </footer>
  );
};
