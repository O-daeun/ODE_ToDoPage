import KebabMenu from "./kebab-menu";

export default function Task() {
  return (
    <li className="relative rounded-md border border-gray-300 bg-white py-3 pl-4 pr-6">
      <div className="absolute right-2 top-3">
        <KebabMenu />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus conse
        maxime itaque.
      </p>
    </li>
  );
}
