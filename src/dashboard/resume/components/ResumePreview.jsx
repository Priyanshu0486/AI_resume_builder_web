import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

    // Ensure the theme color exists
    const themeColor = resumeInfo?.themeColor || '#FF5733'; // Default color if none is set
    
    // Apply theme color to the component when it mounts or changes
    useEffect(() => {
        // Apply the theme color to the document root
        document.documentElement.style.setProperty('--theme-color', themeColor);
        
        // Log the current theme color for debugging
        console.log("ResumePreview using theme color:", themeColor);
        
        // Add print-specific styles when the component mounts
        const styleEl = document.getElementById('resume-preview-print-styles') || document.createElement('style');
        styleEl.id = 'resume-preview-print-styles';
        styleEl.innerHTML = `
            @media print {
                .resume-preview-container {
                    visibility: visible !important;
                    border-top-color: ${themeColor} !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
            }
        `;
        if (!document.getElementById('resume-preview-print-styles')) {
            document.head.appendChild(styleEl);
        }
    }, [themeColor]);
  
    return (
        <div 
            className='resume-preview-container shadow-lg h-full p-14 border-t-[20px] theme-color'
            style={{
                borderTopColor: themeColor,
                '--theme-color': themeColor,
                printColorAdjust: 'exact',
                WebkitPrintColorAdjust: 'exact'
            }}
        >
            {/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={{...resumeInfo, themeColor}} />
            
            {/* Summery  */}
            {resumeInfo?.summery && 
                <SummeryPreview resumeInfo={{...resumeInfo, themeColor}} />
            }
            
            {/* Professional Experience  */}
            {resumeInfo?.experience?.length > 0 && 
                <ExperiencePreview resumeInfo={{...resumeInfo, themeColor}} />
            }
            
            {/* Educational  */}
            {resumeInfo?.education?.length > 0 && 
                <EducationalPreview resumeInfo={{...resumeInfo, themeColor}} />
            }
            
            {/* Skills  */}
            {resumeInfo?.skills?.length > 0 && 
                <SkillsPreview resumeInfo={{...resumeInfo, themeColor}} />
            }
        </div>
    )
}

export default ResumePreview