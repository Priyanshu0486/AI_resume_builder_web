import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  // Ensure theme color is available
  const themeColor = resumeInfo?.themeColor || '#FF5733';
  
  return (
    <div className="personal-details">
        <h2 className='font-bold text-xl text-center theme-colored-text'
        style={{
            color: themeColor,
            '--theme-color': themeColor
        }}
        >
            {resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
        <h2 className='text-center text-sm font-medium'
       >{resumeInfo?.jobTitle}</h2>
       <h2 className='text-center font-normal text-xs theme-colored-text'
        style={{
            color: themeColor,
            '--theme-color': themeColor
        }}>{resumeInfo?.address}</h2>

        <div className='flex justify-between'>
            <h2 className='font-normal text-xs theme-colored-text'
             style={{
                color: themeColor,
                '--theme-color': themeColor
            }}>{resumeInfo?.phone}</h2>
            <h2 className='font-normal text-xs theme-colored-text'
             style={{
                color: themeColor,
                '--theme-color': themeColor
            }}>{resumeInfo?.email}</h2>

        </div>
        <hr className='border-[1.5px] my-2 theme-colored-border'
        style={{
            borderColor: themeColor,
            '--theme-color': themeColor
        }}
        />
    </div>
  )
}

export default PersonalDetailPreview