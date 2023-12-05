import axios from "axios";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase"

const PolygonForm = () => {
  const [message, setMessage] = useState("")
  const [polygon, setPolygon] = useState({
    name: "Test",
    cordinates: [
      [],
      [],
      [],
      [],
      [],
    ],
  });
  const handleLongitudeChange = async (index, value, latLong) => {
    // Make a copy of the coordinates array to avoid mutating state directly
    const updatedCordinates = [...polygon.cordinates];

    // Update the value at the specified index
    updatedCordinates[index][latLong] = parseFloat(value);

    // Update the state with the new coordinates
    setPolygon({
      ...polygon,
      cordinates: updatedCordinates,
    });
  };

  const createPolygon = async (e) => {
    e.preventDefault();
    const areCoordinatesEmpty = polygon.cordinates.some(coord => coord.length !== 2);

  if (polygon.name.trim() === "" || areCoordinatesEmpty) {
    // Display an error message or handle the validation failure in some way
    setMessage("Name and coordinates are required.");
    return;
  }else {
    try {
      console.log(polygon);
       const res = await axios({
      method: "post",
      url: "http://api.agromonitoring.com/agro/1.0/polygons?appid=778761e9e8a810e53ab4c02784115c3d",
      data: {
        name: polygon.name,
        geo_json: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [polygon.cordinates],
          },
        }
      },
    })
    setMessage("Created")
    console.log(res);
      const doc = await addDoc(collection(db, "polygons"), {
          name : res.data.name,
          area : res.data.area,
          created_at : res.data.created_at,
          polygon_id : res.data.id,
          lat : res.data.center[0],
          long : res.data.center[1],  
          // lats : res.data.geo_json.geometry.coordinates.map((ele, i)=>{ return {
          //   `lat${i+1}` : ele[1]
          // } })
          lats: polygon.cordinates.map((ele, i)=>{
            console.log(ele[0]);
            return {
              [i] : ele[0]
            }
          }),
          longs: polygon.cordinates.map((ele, i)=>{
            console.log(ele[1]);
            return {
              [i] : ele[1]
            }
          }),
        })
        console.log(doc);
        // const cordinates = res.data.geo_json.geometry.coordinates
        // const ab = await db.collection('polygons').add({
        // });
        // console.log("ab", ab);
  
  } catch (error) {
      setMessage("Error Occured")
        console.log(error);
    }
  }
   
  };

  return (
    <form className="flex flex-col items-center bg-black min-h-screen text-white " onSubmit={createPolygon}>
      <input
        type="text"
        placeholder="Name of Polygon"
        className="border border-black p-2 m-2 rounded-sm text-black"
        onChange={(e) => setPolygon({ ...polygon, name: e.target.value })}
      />
      <p>
        Cordinates (last cordinate should be same as first and area of polygon
        should be b/w 1 to 3000 ha)
      </p>
      <span>
        <input
          type="number"
          step="any"
          placeholder="latitude"
          className="border border-black p-2 m-2 rounded-sm text-black"
          onChange={(e) => handleLongitudeChange(0, e.target.value, 0)}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          className="border border-black p-2 m-2 rounded-sm text-black"
          onChange={(e) => handleLongitudeChange(0, e.target.value, 1)}
        />
      </span>
      <span>
        <input
          type="number"
          step="any"
          placeholder="latitude"
          className="border border-black p-2 m-2 rounded-sm text-black"
          onChange={(e) => handleLongitudeChange(1, e.target.value, 0)}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          className="border border-black p-2 m-2 rounded-sm text-black"
          onChange={(e) => handleLongitudeChange(1, e.target.value, 1)}
        />
      </span>
      <span>
        <input
          type="number"
          step="any"
          placeholder="latitude"
          className="border border-black p-2 m-2 rounded-sm text-black"
          onChange={(e) => handleLongitudeChange(2, e.target.value, 0)}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          className="border border-black p-2 m-2 rounded-sm text-black"
          onChange={(e) => handleLongitudeChange(2, e.target.value, 1)}
        />
      </span>
      <span>
        <input
          type="number"
          step="any"
          placeholder="latitude"
          className="border border-black p-2 m-2 rounded-sm text-black"
          onChange={(e) => handleLongitudeChange(3, e.target.value, 0)}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          className="border border-black p-2 m-2 rounded-sm text-black"
          onChange={(e) => handleLongitudeChange(3, e.target.value, 1)}
        />
      </span>
      <span>
        <input
          type="number"
          step="any"
          placeholder="latitude"
          className="border border-black p-2 m-2 rounded-sm text-black"
          onChange={(e) => handleLongitudeChange(4, e.target.value, 0)}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          className="border border-black p-2 m-2 rounded-sm text-black"
          onChange={(e) => handleLongitudeChange(4, e.target.value, 1)}
        />
      </span>
          <p>{message}</p>
      <button type="submit" className="bg-[#21ecf3] text-black p-2">
        Create Polygon
      </button>
    </form>
  );
};

export default PolygonForm;
