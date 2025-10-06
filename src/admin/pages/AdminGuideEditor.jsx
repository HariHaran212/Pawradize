import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import AdminPageContainer from '../components/AdminPageContainer';
import apiClient from '../../api/apiClient';
import { BsUpload } from 'react-icons/bs';

const API_URL = "http://localhost:2025";

// Helper to generate a URL-friendly slug from a title string
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')        // Remove all non-word chars
        .replace(/--+/g, '-');          // Replace multiple - with single -
};

const initialState = {
    title: '',
    slug: '',
    subtitle: '',
    author: '',
    snippet: '',
    content: '',
    heroImage: '',
    cta: {
        title: '',
        text: '',
        buttonText: '',
        buttonLink: '',
    },
    status: 'Draft',
};

export default function AdminGuideEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [guideData, setGuideData] = useState(initialState);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [contentId, setContentId] = useState(null); // To store the content ID after creation
    const [loading, setLoading] = useState(isEditing);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            const fetchGuide = async () => {
                try {
                    // NOTE: Your controller uses slug for GET, but ID for PUT/DELETE.
                    // This assumes the `id` from the URL is the document's unique ID.
                    // A new backend endpoint GET /api/content/id/{id} might be needed for consistency.
                    // For now, we'll assume we can fetch by ID. If not, this would be get(`/api/content/${slug}`).
                    const response = await apiClient.get(`${API_URL}/api/content/${id}`); // Assumes you add a fetch-by-id endpoint
                    const fetchedData = response.data.data;
                    setGuideData({ ...initialState, ...fetchedData }); // Clear heroImageUrl to avoid CORS issues
                    setImagePreview(fetchedData.heroImageUrl || null);
                    setContentId(fetchedData.id);
                } catch (err) {
                    setError('Failed to load guide data.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchGuide();
        }
    }, [id, isEditing]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGuideData(prev => ({ ...prev, [name]: value }));

        if (name === 'title') {
            // If the title is being changed, update BOTH the title and the slug together
            setGuideData(prev => ({
                ...prev,
                title: value,
                slug: generateSlug(value)
            }));
        } else {
            // For all other inputs (including manual edits to the slug), just update that one field
            setGuideData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleCtaChange = (e) => {
        const { name, value } = e.target;
        setGuideData(prev => ({
            ...prev,
            cta: { ...prev.cta, [name]: value }
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('contentData', new Blob([JSON.stringify(guideData)], { type: "application/json" }));
        
        if (imageFile) {
            formData.append('heroImageFile', imageFile);
        }

        try {
            if (isEditing) {
                await apiClient.put(`${API_URL}/api/content/${contentId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await apiClient.post(`${API_URL}/api/content`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            alert(`Guide ${isEditing ? 'updated' : 'created'} successfully!`);
            navigate('/admin/content');
        } catch (err) {
            setError(`Failed to ${isEditing ? 'update' : 'create'} guide.`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    // if (isEditing && loading) return <AdminPageContainer><p>Loading editor...</p></AdminPageContainer>;
    // if (error) return <AdminPageContainer><p className="text-red-500">{error}</p></AdminPageContainer>;

    return (
        <AdminPageContainer>
            <h1 className="text-2xl font-bold text-primary mb-6">{isEditing ? 'Edit Guide' : 'Add New Guide'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="bg-white p-6 rounded-2xl shadow-md grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Guide Title</label>
                        {/* Style updated */}
                        <input type="text" name="title" value={guideData.title} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">URL Slug</label>
                        {/* Style updated */}
                        <input type="text" name="slug" value={guideData.slug} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$" />
                        <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (e.g., 'new-puppy-guide').</p>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold mb-2">Subtitle</label>
                        {/* Style updated */}
                        <input type="text" name="subtitle" value={guideData.subtitle} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" />
                    </div>
                     <div>
                        <label className="block text-sm font-semibold mb-2">Author</label>
                        {/* Style updated */}
                        <input type="text" name="author" value={guideData.author} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" />
                    </div>
                    <div className="md:col-span-2">
                         <label className="block text-sm font-semibold mb-2">Snippet / Teaser</label>
                         {/* Style updated */}
                         <textarea name="snippet" value={guideData.snippet} onChange={handleInputChange} rows="3" className="w-full border border-accent rounded-md p-2"></textarea>
                         <p className="text-xs text-gray-500 mt-1">A short summary shown in list views.</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <label className="block text-sm font-semibold mb-2">Hero Image</label>
                    <div className="w-full h-72 bg-ivory rounded-lg border-2 border-dashed border-accent flex items-center justify-center mb-4">
                        {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" /> : <BsUpload size={32} className="text-gray-400"/>}
                    </div>
                    <label className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg shadow hover:bg-secondary transition cursor-pointer">
                        Upload New Image
                        <input type="file" onChange={handleFileChange} accept="image/*" className="hidden"/>
                    </label>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <label className="block text-sm font-semibold mb-2">Main Content</label>
                    <Editor apiKey={import.meta.env.VITE_TINYMCE_API_KEY} value={guideData.content} onEditorChange={(newContent) => setGuideData(prev => ({ ...prev, content: newContent }))}
                        init={{ height: 500, menubar: false, plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount', toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat' }} />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold text-text-dark mb-4">Call to Action Block</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Style updated */}
                        <input type="text" name="title" placeholder="CTA Title" value={guideData.cta.title} onChange={handleCtaChange} className="w-full border border-accent rounded-md p-2" />
                        {/* Style updated */}
                        <input type="text" name="buttonText" placeholder="Button Text (e.g., Shop Now)" value={guideData.cta.buttonText} onChange={handleCtaChange} className="w-full border border-accent rounded-md p-2" />
                        {/* Style updated */}
                        <textarea name="text" placeholder="CTA Text/Description" value={guideData.cta.text} onChange={handleCtaChange} rows="2" className="w-full border border-accent rounded-md p-2 md:col-span-2"></textarea>
                        {/* Style updated */}
                        <input type="text" name="buttonLink" placeholder="Button Link (e.g., /shop)" value={guideData.cta.buttonLink} onChange={handleCtaChange} className="w-full border border-accent rounded-md p-2 md:col-span-2" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Status</label>
                        {/* Style updated */}
                        <select name="status" value={guideData.status} onChange={handleInputChange} className="w-full bg-white border border-accent rounded-md py-2 px-4">
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>
                    <div className="flex gap-4 w-full max-w-md">
                      <Link 
                        to="/admin/content" 
                        className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-center"
                      >
                        Cancel
                      </Link>

                      <button 
                        type="submit" 
                        className="flex-1 bg-primary text-white font-semibold py-2 px-3 rounded-lg hover:bg-secondary transition-colors" 
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : (isEditing ? 'Update Guide' : 'Save Guide')}
                      </button>
                    </div>
                </div>
            </form>
        </AdminPageContainer>
    );
}