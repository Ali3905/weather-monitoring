import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import PolygonData from '../components/PolygonData'

const PolygonsPage = () => {
    const navigate = useNavigate()
    const [polygons, setPolygons] = useState(null)
    const [polygon, setPolygon] = useState(null)
    const [lats, setLats] = useState(null)
    const [longss, setLongs] = useState(null)

    const getPolygons = async() => {
      const q = query(collection(db, "polygons"), where("area", ">", 0));
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      const pol = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        pol.push(doc.data())
      });
      const latitudes = []
      const longitudes = []
      pol.forEach(polygon => {
        polygon.lats.forEach((ele, i)=>{
          latitudes.push(ele[i])
        })
        polygon.lats = latitudes

        polygon.longs.forEach((ele, i)=>{
          longitudes.push(ele[i])
        })
        polygon.longs = longitudes
      });
      
      setPolygons(pol)
      // console.log(polygons);
    }
    useEffect(()=>{
      getPolygons()
    }, [])
  return (
    <div className='px-16 py-4 flex flex-col items-start bg-black min-h-screen h-full text-white'>
      {/* polygons a rahe hain sbr kro create to kro */}
        <button onClick={()=>navigate("/createpolygon")} className='bg-[#21ecf3] text-black p-4 roumd block self-end'>Create Polygon</button>
        <h2 className='font-bold text-3xl'>Polygons</h2>
      <div className='border-t border-gray-400 mt-4 w-full'>
        {
          polygons !== null && polygons.map((ele)=>{
            return <div className='flex gap-5 p-4 border-b border-x border-gray-400 cursor-pointer hover:bg-[#21ecf3]' key={ele.polygon_id} onClick={()=>setPolygon(ele)}> 
              <p>{ele.name}</p>
              <p>{ele.area} ha</p>
              {/* <p>{ele.longs[2]} ha</p> */}
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
