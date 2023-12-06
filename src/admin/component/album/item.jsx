import React from "react";
import { setModalAlbum } from "../../../redux-toolkit/slices/uiSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const items = props => {
  const dispatch = useDispatch();
  const handleClickEdit = () => {
    // console.log(props.item);
    props.handleAlbumdata(props.item)
    dispatch(setModalAlbum(true))
  };
  const formatDate = (dateTimeString) => {
    // Tách ngày và thời gian từ chuỗi đầu vào
    const datePart = dateTimeString.substring(0, 8); // Lấy phần ngày: YYYYMMDD
    const timePart = dateTimeString.substring(9, 15); // Lấy phần thời gian: HHmmss
  
    // Tạo đối tượng Date từ các thành phần được tách
    const year = datePart.substring(0, 4);
    const month = datePart.substring(4, 6);
    const day = datePart.substring(6, 8);
  
    const hours = timePart.substring(0, 2);
    const minutes = timePart.substring(2, 4);
    const seconds = timePart.substring(4, 6);
  
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log(formattedDateTime);
    return formattedDateTime;
  };

  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 text-center">{props.item.id}</td>
      <td className="px-6 py-4 text-center">{props.item.albumGenre}</td>
      <td className="px-6 py-4 text-center">{props.item.albumName}</td>
      <td className="px-6 py-4 text-center">{formatDate(props.item.createAt)}</td>
      <td className="px-6 py-4 text-center">{formatDate(props.item.updateOn)}</td>
      <td className="px-6 py-4 text-center">{props.item.albumPolicy}</td>
      <td className="px-6 py-4 text-center">{props.item.user.id ? props.item.user.id : props.item.user}</td>
      <td className="px-6 py-4 text-center">
        <button onClick={handleClickEdit} className="bg-white w-[40px] text-blue-500 rounded hover:bg-black hover:text-white"> <FontAwesomeIcon icon={faPenToSquare} /></button>
      </td>
    </tr>
  );
};

export default items;