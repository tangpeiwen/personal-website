import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import http from "../../utils/http"

export default function Notebooks() {

    const [notebooks, setNotebooks] = useState([])

    useEffect(() => {
        http.get('/api/notebooks').then(data => setNotebooks(data))
    }, [])

    return (
        <div className="w-full flex flex-col gap-2 p-4">
            {
                notebooks.map(item => (
                    <a href={`https://www.jianshu.com/nb/${item.id}`} target="_blank" className="cursor-pointer w-fit text-gray-600 py-1 border-b-0 bg-no-repeat bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[length:100%_3px] bg-[length:0_3px] bg-left-bottom transition-[background-size] duration-500 ease-in-out">
                        <FontAwesomeIcon icon={faBook} className="mr-2" />
                        {item.name}
                    </a>
                ))
            }
        </div>
    )
}