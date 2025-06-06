import type { Dog } from "../api/dogApi";

interface DogRowProps {
  dog: Dog;
}

export function DogRow({ dog }: DogRowProps) {
  return (
    <tr>
      <td className="flex items-center gap-2">
        <img
          src={dog.img}
          alt={dog.name}
          className="w-10 h-10 rounded object-cover"
        />
        {dog.name}
      </td>
      <td>{dog.age}</td>
      <td>{dog.breed}</td>
      <td>{dog.zip_code}</td>
    </tr>
  );
}
