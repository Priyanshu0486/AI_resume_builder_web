import { Calendar, Edit2, Eye, Notebook, Trash2, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import GlobalApi from './../../../service/GlobalApi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from 'sonner'

function ResumeCardItems({resume, refreshData}) {
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Format date from timestamp to readable format
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently created';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  // Handle resume deletion
  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      console.log(resp);
      toast('Resume Deleted!');
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      setLoading(false);
    })
  }

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-200 hover:border-primary">
        {/* Card content - Maintain clickability to edit page */}
        <Link to={`/dashboard/resume/${resume.documentId}/edit`} className="block">
          <div className='relative p-5 h-[280px]'>
            {/* Background gradient with theme color */}
            <div 
              className='absolute top-0 left-0 right-0 h-32 opacity-30 -z-10'
              style={{ 
                background: resume.themeColor ? `linear-gradient(to right, ${resume.themeColor}, ${resume.themeColor}80)` : 'linear-gradient(to right, #4F46E5, #8B5CF6)' 
              }}
            />

            {/* Preview image */}
            <div className='w-full flex items-center justify-center mb-5 pt-3'>
              <div className='relative bg-white p-1 rounded-full shadow-md'>
                <img 
                  src="/cv.png" 
                  alt="Resume" 
                  className="w-16 h-16 object-contain transform transition-transform group-hover:scale-110 duration-300" 
                />
                {resume.themeColor && (
                  <div 
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white"
                    style={{ backgroundColor: resume.themeColor }}
                  />
                )}
              </div>
            </div>

            {/* Resume info */}
            <div className="text-center space-y-1">
              <h2 className='font-bold text-lg truncate group-hover:text-primary transition-colors'>
                {resume.title || 'Untitled Resume'}
              </h2>
              <div className="flex items-center justify-center gap-1 text-gray-500 text-xs">
                <Calendar size={14} />
                <span>{formatDate(resume.updatedAt || resume.createdAt)}</span>
              </div>
            </div>

            {/* Resume details */}
            <div className="mt-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <User size={14} />
                <span className="truncate">
                  {resume.firstName ? `${resume.firstName} ${resume.lastName || ''}` : 'Not specified'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Notebook size={14} />
                <span className="truncate">{resume.jobTitle || 'No job title'}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Action buttons - Keep outside the Link to prevent event bubbling */}
        <div 
          className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10" 
          onClick={(e) => e.stopPropagation()}
        >
          <Link 
            to={`/dashboard/resume/${resume.documentId}/edit`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button variant="secondary" size="sm" className="flex gap-1 items-center">
              <Edit2 size={14} /> Edit
            </Button>
          </Link>
          <Link 
            to={`/my-resume/${resume.documentId}/view`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="flex gap-1 items-center"
              style={{ 
                borderColor: resume.themeColor, 
                color: resume.themeColor 
              }}
            >
              <Eye size={14} /> View
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm" 
            className="flex gap-1 items-center"
            onClick={(e) => {
              e.stopPropagation();
              setOpenAlert(true);
            }}
          >
            <Trash2 size={14} /> Delete
          </Button>
        </div>

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={openAlert} onOpenChange={setOpenAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Delete Resume</DialogTitle>
            <DialogDescription className="mt-4 text-gray-600">
              Are you sure you want to delete "{resume.title || 'Untitled Resume'}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setOpenAlert(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={onDelete}
              disabled={isLoading}
              className="relative"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>Delete</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ResumeCardItems