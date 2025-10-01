import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import AdminPageContainer from '../components/AdminPageContainer';

// Sample data for editing
const sampleGuidesData = {
    'new-puppy-guide': { title: 'Your Guide to Bringing a New Puppy Home', subtitle: 'PUPPY CARE 101', status: 'Published', content: '<p>Welcome to the exciting journey...</p>' },
    // ...other guides data
};

export default function AdminGuideEditor() {
  const { id } = useParams(); // Check for an ID in the URL for editing
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Draft');
  const [content, setContent] = useState(''); // This will hold the HTML from the editor

  useEffect(() => {
    if (isEditing) {
        // In a real app, fetch this data from an API
        const guideData = sampleGuidesData[id];
        if (guideData) {
            setTitle(guideData.title);
            setStatus(guideData.status);
            setContent(guideData.content);
        }
    }
  }, [id, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isEditing ? 'updated' : 'created';
    console.log(`Guide ${action}:`, { id: id || Date.now(), title, status, content });
    alert(`Guide ${action} successfully!`);
    navigate('/admin/content');
  };

  return (
    <AdminPageContainer>
      <h1 className="text-2xl font-bold text-primary mb-6">
        {isEditing ? 'Edit Guide' : 'Add New Guide'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <label className="block text-sm font-semibold mb-2">Guide Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-accent rounded-md p-2" required />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <label className="block text-sm font-semibold mb-2">Content</label>
            {/* The Rich Text Editor Component */}
            <Editor
            	apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 300,
                menubar: false,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
              }}
            />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <label className="block text-sm font-semibold mb-2">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-white border border-accent rounded-md p-2">
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
            </select>
        </div>
        <div className="flex gap-4">
            <button type="submit" className="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-secondary transition-colors">
                {isEditing ? 'Update Guide' : 'Save Guide'}
            </button>
            <Link to="/admin/content" className="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                Cancel
            </Link>
        </div>
      </form>
    </AdminPageContainer>
  );
}