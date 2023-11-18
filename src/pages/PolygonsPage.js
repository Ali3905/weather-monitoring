import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import PolygonData from '../components/PolygonData'

const PolygonsPage = () => {
    const navigate = useNavigate()
    const [polygons, setPolygons] = useState(null)
    const [polygon, setPolygon] = useState(null)

    const getPolygons = async() => {
      const q = query(collection(db, "polygons"), where("area", ">", 0));
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      const pol = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        pol.push(doc.data())
      });
      setPolygons(pol)
    }
    useEffect(()=>{
      getPolygons()
    }, [])
  return (
    <div>
      {/* polygons a rahe hain sbr kro create to kro */}
        <button onClick={()=>navigate("/createpolygon")} className='bg-black text-white p-4 roumd'>Create Polygon</button>
      <div className='border-t border-gray-400'>
        {
          polygons !== null && polygons.map((ele)=>{
            return <div className='flex gap-5 p-4 border-b border-gray-400 cursor-pointer hover:bg-gray-100' onClick={()=>setPolygon(ele)}> 
              <p>{ele.name}</p>
              <p>{ele.area} ha</p>
              {/* <p>{ele.}</p> */}
            </div>
          })
        }
        </div>
        {polygon !== null && <PolygonData polygon={polygon}  />}
    </div>
  )
}

export default PolygonsPage
