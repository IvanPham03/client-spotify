import React from "react";

const items = props => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 text-center">{props.item.userId}</td>
      <td className="px-6 py-4 text-center">{props.item.userName}</td>
      <td className="px-6 py-4 text-center">{props.item.email}</td>
      <td className="px-6 py-4 text-center">{props.item.phoneNumber}</td>
      <td className="px-6 py-4 text-center">{props.item.pathImg}</td>
      <td className="px-6 py-4 text-center">{props.item.updateOn}</td>
      <td className="px-6 py-4 text-center">{props.item.role}</td>
      <td className="px-6 py-4 text-center">
        <button className="bg-white w-[40px] text-red-500 rounded hover:bg-black hover:text-white">Edit</button>
      </td>
    </tr>
  );
};

export default items;