import React from 'react'

function SummeryPreview({resumeInfo}) {
  // If summary is not available, return null to avoid rendering an empty section
  if (!resumeInfo?.summery) {
    return null;
  }
  
  return (
    <div className="my-4">
      <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color: resumeInfo?.themeColor
        }}
      >Summary</h2>
      <hr style={{
          borderColor: resumeInfo?.themeColor
      }} />
      <p className='text-xs mt-2'>
          {resumeInfo?.summery}
      </p>
    </div>
  )
}

export default SummeryPreview