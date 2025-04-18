import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt="Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Fresher level in 3-4 lines in array format, With summary and experience_level Field in JSON Format"
function Summery({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summery,setSummery]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();
    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])

    const GenerateSummeryFromAI=async()=>{
        if(!resumeInfo?.jobTitle) {
            toast.error("Please enter a job title first");
            return;
        }
        
        setLoading(true);
        try {
            const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
            console.log("Sending prompt:", PROMPT);
            const result = await AIChatSession.sendMessage(PROMPT);
            console.log("Raw AI response:", result.response);
            
            // Try to safely parse the response
            let responseText = result.response.text();
            console.log("Response text:", responseText);
            
            // Find JSON in the response text if it's wrapped in other content
            let jsonMatch = responseText.match(/\[.*\]/s);
            if (jsonMatch) {
                responseText = jsonMatch[0];
            }
            
            try {
                const parsedData = JSON.parse(responseText);
                console.log("Parsed data:", parsedData);
                setAiGenerateSummeryList(parsedData);
                toast.success("AI suggestions generated successfully");
            } catch (parseError) {
                console.error("Error parsing AI response:", parseError);
                toast.error("Failed to parse AI response");
                setAiGenerateSummeryList(null);
            }
        } catch (error) {
            console.error("Error generating summaries:", error);
            toast.error("Failed to generate summaries");
        } finally {
            setLoading(false);
        }
    }

    const onSave=(e)=>{
        e.preventDefault();
       
        setLoading(true)
        const data={
            data:{
                summery:summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details updated")
        },(error)=>{
            setLoading(false);
            toast.error("Failed to save summary");
        })
    }
    return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summary</label>
                <Button variant="outline" onClick={()=>GenerateSummeryFromAI()} 
                type="button" size="sm" className="border-primary text-primary flex gap-2" disabled={loading}> 
                {loading ? <LoaderCircle className='animate-spin h-4 w-4' /> : <Brain className='h-4 w-4' />}  Generate from AI</Button>
            </div>
            <Textarea className="mt-5" required
            value={summery}
                defaultValue={summery?summery:resumeInfo?.summery}
            onChange={(e)=>setSummery(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
            <Button type="submit"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
            </div>
        </form>
        </div>

        
       {aiGeneratedSummeryList && Array.isArray(aiGeneratedSummeryList) && aiGeneratedSummeryList.length > 0 && (
            <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummeryList.map((item, index) => (
                    <div key={index} 
                    onClick={() => setSummery(item?.summary || item?.summery)}
                    className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:shadow-xl transition-shadow'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary || item?.summery}</p>
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

export default Summery