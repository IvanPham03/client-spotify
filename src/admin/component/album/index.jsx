import React, { useEffect } from 'react'
import Item from './item'
const index = props => {
  const handleAlbumdata = (data) =>{
    // console.log(data);
    props.handleAlbumdata(data)
  }
  return (
    <div>
    <div>
    <form> 
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-eLg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-eLg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
    </form>
    </div>
    <div className="relative mt-5 overflow-x-auto shadow-md sm:roundedLg">
      <table className="w-full text-sm textLeft text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Thể loại
            </th>
            <th scope="col" className="px-6 py-3">
              Tên
            </th>
            <th scope="col" className="px-6 py-3">
              Thời gian tạo
            </th>
            <th scope="col" className="px-6 py-3">
              Thời gian chỉnh sửa
            </th>
            <th scope="col" className="px-6 py-3">
              Hiển thị
            </th>
            <th scope="col" className="px-6 py-3">
              Người tạo
            </th>
            <th scope="col" className="px-6 py-3">
              Chỉnh sửa
            </th>
          </tr>
        </thead>
        <tbody>
          { props.albums !== null ?
            props.albums.map((item) =>{
              return <Item item={item} key={item.id} handleAlbumdata={handleAlbumdata}/>
            }) :  null
          }
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default index