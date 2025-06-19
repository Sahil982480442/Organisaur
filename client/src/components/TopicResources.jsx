// import { useEffect, useState } from 'react';
// import API from '../api';

// const TopicResources = ({ topicId }) => {
//   const [resources, setResources] = useState([]);

//   useEffect(() => {
//     API.get(`/submissions/${topicId}`)
//       .then(res => setResources(res.data))
//       .catch(err => console.error(err));
//   }, [topicId]);

//   return (
//     <div className="mt-4">
//       <h3 className="font-semibold text-lg mb-2">Approved Resources</h3>
//       {resources.length === 0 ? (
//         <p className="text-sm text-gray-500">No approved resources yet.</p>
//       ) : (
//         <ul className="list-disc list-inside text-blue-600">
//           {resources.map((res) => (
//             <li key={res._id}>
//               <a href={res.link} target="_blank">{res.name} - {res.type}</a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TopicResources;
