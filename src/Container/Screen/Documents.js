import React, { useState } from "react";
import { 
  FileText, 
  UploadCloud, 
  Eye, 
  Download, 
  Trash2, 
  CheckCircle, 
  FilePlus,
  Search,
  MoreVertical
} from "lucide-react";

const Documents = () => {
  const [documents, setDocuments] = useState([
    { name: "Aadhaar Card", fileType: "PDF", size: "1.2 MB", date: "Oct 12, 2023" },
    { name: "PAN Card", fileType: "PDF", size: "0.8 MB", date: "Oct 14, 2023" },
    { name: "Education Certificate", fileType: "PDF", size: "4.5 MB", date: "Nov 02, 2023" },
    { name: "Offer Letter", fileType: "PDF", size: "2.1 MB", date: "Nov 15, 2023" },
    { name: "Experience Letter", fileType: "PDF", size: "3.2 MB", date: "Dec 01, 2023" },
    { name: "Profile Photo", fileType: "Image", size: "5.0 MB", date: "Dec 05, 2023" },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans selection:bg-indigo-100">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 px-6 py-8 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Document Vault</h1>
            <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-500" /> 
              Secure military-grade storage for your credentials
            </p>
          </div>
          
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search folders or files..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all font-medium"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* LEFT: UPLOAD WIDGET */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200 sticky top-10">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FilePlus size={18} className="text-indigo-600" />
                Quick Upload
              </h3>
              
              <div className="relative group">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center group-hover:border-indigo-400 group-hover:bg-indigo-50/30 transition-all duration-300">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">Drop files here</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">or click to browse</p>
                </div>
              </div>

              {selectedFile && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                   <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                      <CheckCircle size={16} />
                   </div>
                   <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-bold text-emerald-900 truncate">{selectedFile.name}</p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase">Ready to sync</p>
                   </div>
                </div>
              )}

              <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-[0.98]">
                Upload Selected
              </button>
            </div>
          </div>

          {/* RIGHT: DOCUMENT GRID */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8 px-2">
               <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest text-sm">All Assets ({documents.length})</h3>
               <div className="flex gap-2">
                  <button className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-indigo-600"><MoreVertical size={18}/></button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-200 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${doc.fileType === 'PDF' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}`}>
                       <FileText size={28} />
                    </div>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">
                      {doc.fileType}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
                    {doc.name}
                  </h4>
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-bold mb-8">
                     <span>{doc.size}</span>
                     <span className="w-1 h-1 bg-slate-200 rounded-full" />
                     <span>{doc.date}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => window.open('#', '_blank')}
                      className="flex flex-col items-center justify-center py-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    >
                      <Eye size={18} />
                      <span className="text-[9px] font-black uppercase mt-1">View</span>
                    </button>
                    <button 
                      onClick={() => alert("Downloading...")}
                      className="flex flex-col items-center justify-center py-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                    >
                      <Download size={18} />
                      <span className="text-[9px] font-black uppercase mt-1">Fetch</span>
                    </button>
                    <button 
                      className="flex flex-col items-center justify-center py-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                    >
                      <Trash2 size={18} />
                      <span className="text-[9px] font-black uppercase mt-1">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Documents;