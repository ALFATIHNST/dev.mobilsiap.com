export default function EmptyState({

  title,

}:{

  title:string;

}){

return(

<div className="py-16 text-center">

<div className="text-6xl">

📦

</div>

<h3 className="mt-4 text-lg font-semibold">

{title}

</h3>

<p className="text-gray-500 mt-2">

Belum ada data.

</p>

</div>

);

}
