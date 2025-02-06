// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import Loader from "./component/loader/page";
// import { redirect } from "next/navigation";

// export default function Home() {
//   // const [tasklist, setTaskList] = useState();
//   // const [loading, setLoading] = useState(false);

//   // const fetchTaskList = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const userResponse = await fetch("/api/get-task-list");
//   //     const data = await userResponse.json();

//   //     console.log("userResponse", data);
//   //     setLoading(false);
//   //     setTaskList(data?.tasklist);
//   //   } catch (err) {
//   //     console.log("error:", err);
//   //     setLoading(true);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchTaskList();
//   // }, []);
//   redirect("/login");
//   return null;
//   // return (
//   // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//   //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//   //     <Image
//   //       className="dark:invert"
//   //       src="/next.svg"
//   //       alt="Next.js logo"
//   //       width={180}
//   //       height={38}
//   //       priority
//   //     />
//   //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//   //       <li className="mb-2">
//   //         Get started by editing{" "}
//   //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//   //           src/app/page.js
//   //         </code>
//   //         .
//   //       </li>
//   //       <li>Save and see your changes instantly.</li>
//   //     </ol>

//   //     <div className="flex gap-4 items-center flex-col sm:flex-row">
//   //       <a
//   //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//   //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//   //         target="_blank"
//   //         rel="noopener noreferrer">
//   //         <Image
//   //           className="dark:invert"
//   //           src="/vercel.svg"
//   //           alt="Vercel logomark"
//   //           width={20}
//   //           height={20}
//   //         />
//   //         Deploy now after sign In
//   //       </a>
//   //       <a
//   //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//   //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//   //         target="_blank"
//   //         rel="noopener noreferrer">
//   //         Read our docs
//   //       </a>
//   //     </div>
//   //   </main>
//   //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//   //     <a
//   //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//   //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//   //       target="_blank"
//   //       rel="noopener noreferrer">
//   //       <Image
//   //         aria-hidden
//   //         src="/file.svg"
//   //         alt="File icon"
//   //         width={16}
//   //         height={16}
//   //       />
//   //       Learn
//   //     </a>
//   //     <a
//   //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//   //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//   //       target="_blank"
//   //       rel="noopener noreferrer">
//   //       <Image
//   //         aria-hidden
//   //         src="/window.svg"
//   //         alt="Window icon"
//   //         width={16}
//   //         height={16}
//   //       />
//   //       Examples
//   //     </a>
//   //     <a
//   //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//   //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//   //       target="_blank"
//   //       rel="noopener noreferrer">
//   //       <Image
//   //         aria-hidden
//   //         src="/globe.svg"
//   //         alt="Globe icon"
//   //         width={16}
//   //         height={16}
//   //       />
//   //       Go to nextjs.org →
//   //     </a>
//   //   </footer>
//   // </div>
//   // <div className="w-full flex  flex-row flex-wrap bg-white p-5 group">
//   //   {loading ? (
//   //     <Loader />
//   //   ) : (
//   //     tasklist?.map((task, t) => {
//   //       return (
//   //         <div
//   //           className="w-[calc((100%-32px)/3)] mr-4 flex mb-4 custom-nth"
//   //           key={t}>
//   //           <div className="w-full flex flex-col border rounded-lg shadow-md">
//   //             <div className="w-full flex bg-red-300 rounded-lg p-2">
//   //               Task [ {t + 1} ]
//   //             </div>
//   //             <div className="w-full p-2">
//   //               <div className="text-stone-700 text-lg font-serif">
//   //                 {task?.taskname}
//   //               </div>
//   //               <div className="text-stone-700 text-sm font-serif my-2">
//   //                 {task?.taskdesc}
//   //               </div>

//   //               <div className="flex justify-between">
//   //                 <div className="flex text-stone-700 text-sm font-semibold">
//   //                   Status:{" "}
//   //                   <p className="text-sm font-sans ml-1"> {task?.status}</p>
//   //                 </div>
//   //                 <div className="flex text-stone-700 text-sm font-semibold">
//   //                   Assigned To:{" "}
//   //                   <p className="text-sm font-sans ml-1">
//   //                     {" "}
//   //                     {task?.assignee}
//   //                   </p>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       );
//   //     })
//   //   )}

//   {
//     /* <div className="w-1/3 flex mb-4 mr-4">
//         <div className="w-full flex flex-col border rounded-lg shadow-md">
//           <div className="w-full flex bg-red-300 rounded-lg p-2">
//             Task [ #001 ]
//           </div>
//           <div className="w-full p-2">
//             <div className="text-stone-700 text-lg font-serif">Task Title</div>
//             <div className="text-stone-700 text-sm font-serif my-2">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s,{" "}
//             </div>

//             <div className="flex text-stone-700 text-sm font-semibold">
//               Status: <p className="text-sm font-sans ml-1">Completed</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/3 flex mb-4 mr-4">
//         <div className="w-full flex flex-col border rounded-lg shadow-md">
//           <div className="w-full flex bg-red-300 rounded-lg p-2">
//             Task [ #001 ]
//           </div>
//           <div className="w-full p-2">
//             <div className="text-stone-700 text-lg font-serif">Task Title</div>
//             <div className="text-stone-700 text-sm font-serif my-2">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s,{" "}
//             </div>

//             <div className="flex text-stone-700 text-sm font-semibold">
//               Status: <p className="text-sm font-sans ml-1">Completed</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/3 flex mb-4 mr-4">
//         <div className="w-full flex flex-col border rounded-lg shadow-md">
//           <div className="w-full flex bg-red-300 rounded-lg p-2">
//             Task [ #001 ]
//           </div>
//           <div className="w-full p-2">
//             <div className="text-stone-700 text-lg font-serif">Task Title</div>
//             <div className="text-stone-700 text-sm font-serif my-2">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s,{" "}
//             </div>

//             <div className="flex text-stone-700 text-sm font-semibold">
//               Status: <p className="text-sm font-sans ml-1">Completed</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/3 flex mb-4 mr-4">
//         <div className="w-full flex flex-col border rounded-lg shadow-md">
//           <div className="w-full flex bg-red-300 rounded-lg p-2">
//             Task [ #001 ]
//           </div>
//           <div className="w-full p-2">
//             <div className="text-stone-700 text-lg font-serif">Task Title</div>
//             <div className="text-stone-700 text-sm font-serif my-2">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s,{" "}
//             </div>

//             <div className="flex text-stone-700 text-sm font-semibold">
//               Status: <p className="text-sm font-sans ml-1">Completed</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/3 flex mb-4 mr-4">
//         <div className="w-full flex flex-col border rounded-lg shadow-md">
//           <div className="w-full flex bg-red-300 rounded-lg p-2">
//             Task [ #001 ]
//           </div>
//           <div className="w-full p-2">
//             <div className="text-stone-700 text-lg font-serif">Task Title</div>
//             <div className="text-stone-700 text-sm font-serif my-2">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s,{" "}
//             </div>

//             <div className="flex text-stone-700 text-sm font-semibold">
//               Status: <p className="text-sm font-sans ml-1">Completed</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/3 flex mb-4 mr-4">
//         <div className="w-full flex flex-col border rounded-lg shadow-md">
//           <div className="w-full flex bg-red-300 rounded-lg p-2">
//             Task [ #001 ]
//           </div>
//           <div className="w-full p-2">
//             <div className="text-stone-700 text-lg font-serif">Task Title</div>
//             <div className="text-stone-700 text-sm font-serif my-2">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s,{" "}
//             </div>

//             <div className="flex text-stone-700 text-sm font-semibold">
//               Status: <p className="text-sm font-sans ml-1">Completed</p>
//             </div>
//           </div>
//         </div>
//       </div> */
//   }
//   // </div>
//   // );
// }

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
  return null;
}
