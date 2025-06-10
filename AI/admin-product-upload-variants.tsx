import React, { useState } from 'react';
import { 
  Package, 
  FileText, 
  DollarSign, 
  Tag, 
  Grid, 
  Layers, 
  Award, 
  Users, 
  Moon, 
  Sun,
  ArrowRight,
  Upload,
  Image,
  Video,
  Check,
  Plus,
  Trash2,
  Palette,
  Ruler
} from 'lucide-react';

const AdminProductUpload = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    subCategory: '',
    brand: '',
    genderApplicable: false,
    gender: '',
    hasVariants: false
  });

  const [variants, setVariants] = useState([
    {
      id: 1,
      color: '',
      colorHex: '',
      size: '',
      stock: '',
      images: []
    }
  ]);

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Beauty & Personal Care',
    'Toys & Games',
    'Automotive'
  ];

  const subCategories = {
    'Electronics': ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'Gaming'],
    'Clothing': ['Shirts', 'Pants', 'Dresses', 'Shoes', 'Accessories'],
    'Home & Garden': ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Garden Tools'],
    'Sports & Outdoors': ['Fitness', 'Outdoor Gear', 'Team Sports', 'Water Sports'],
    'Books': ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Comics'],
    'Beauty & Personal Care': ['Skincare', 'Makeup', 'Hair Care', 'Fragrances'],
    'Toys & Games': ['Action Figures', 'Board Games', 'Educational Toys', 'Dolls'],
    'Automotive': ['Car Parts', 'Tools', 'Accessories', 'Maintenance']
  };

  const brands = [
    'Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'Canon', 'Dell',
    'HP', 'Microsoft', 'Google', 'Amazon', 'Zara', 'H&M', 'Uniqlo'
  ];

  const colors = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#008000' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Multicolored', hex: 'linear-gradient(45deg, #FF0000, #00FF00, #0000FF)' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12', '13', '14'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setVariants(prev => prev.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    ));
  };

  const addVariant = () => {
    setVariants(prev => [...prev, {
      id: Date.now(),
      color: '',
      colorHex: '',
      size: '',
      stock: '',
      images: []
    }]);
  };

  const removeVariant = (index) => {
    if (variants.length > 1) {
      setVariants(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const themeClasses = darkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gray-50 text-gray-900';
  
  const cardClasses = darkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';
  
  const inputClasses = darkMode 
    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500';

  const ProductInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center px-4 py-2 rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
          <Package className="w-5 h-5 mr-2" />
          Step 1: Product Information
        </div>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Product Name */}
        <div className="w-full flex flex-col items-center">
          <label className="flex items-center text-sm font-medium mb-2 w-full max-w-md">
            <Package className="w-4 h-4 mr-2" />
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full max-w-md px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div className="w-full flex flex-col items-center">
          <label className="flex items-center text-sm font-medium mb-2 w-full max-w-md">
            <FileText className="w-4 h-4 mr-2" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`w-full max-w-md px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${inputClasses}`}
            placeholder="Describe your product in detail"
            required
          />
        </div>

        {/* Price and Discount */}
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            <div className="flex flex-col items-center sm:items-start">
              <label className="flex items-center text-sm font-medium mb-2 w-full">
                <DollarSign className="w-4 h-4 mr-2" />
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
                placeholder="0.00"
                required
              />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <label className="flex items-center text-sm font-medium mb-2 w-full">
                <Tag className="w-4 h-4 mr-2" />
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                min="0"
                max="100"
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Category and Subcategory */}
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            <div className="flex flex-col items-center sm:items-start">
              <label className="flex items-center text-sm font-medium mb-2 w-full">
                <Grid className="w-4 h-4 mr-2" />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <label className="flex items-center text-sm font-medium mb-2 w-full">
                <Layers className="w-4 h-4 mr-2" />
                Sub Category
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
                disabled={!formData.category}
                required
              >
                <option value="">Select Sub Category</option>
                {formData.category && subCategories[formData.category]?.map(subCat => (
                  <option key={subCat} value={subCat}>{subCat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="w-full flex flex-col items-center">
          <label className="flex items-center text-sm font-medium mb-2 w-full max-w-md">
            <Award className="w-4 h-4 mr-2" />
            Brand
          </label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            className={`w-full max-w-md px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
            required
          >
            <option value="">Select Brand</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Gender Applicable */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center text-sm font-medium">
                <Users className="w-4 h-4 mr-2" />
                Gender Applicable
              </label>
              <input
                type="checkbox"
                name="genderApplicable"
                checked={formData.genderApplicable}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            
            {formData.genderApplicable && (
              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
                  required={formData.genderApplicable}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Has Variants */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center text-sm font-medium">
                <Palette className="w-4 h-4 mr-2" />
                Has Variants (Colors/Sizes)
              </label>
              <input
                type="checkbox"
                name="hasVariants"
                checked={formData.hasVariants}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            {formData.hasVariants && (
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                Enable this for products with multiple colors, sizes, or other variants
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={handleNextStep}
            className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } shadow-lg hover:shadow-xl`}
          >
            Next: Media Upload
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );

  const MediaUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center px-4 py-2 rounded-full ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
          <Upload className="w-5 h-5 mr-2" />
          Step 2: Media Upload
        </div>
      </div>

      {/* Product Summary */}
      <div className={`p-6 rounded-lg border ${cardClasses} mb-8 max-w-4xl mx-auto`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center justify-center sm:justify-start">
          <Package className="w-5 h-5 mr-2" />
          Product Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-center sm:text-left">
          <div><span className="font-medium">Name:</span> {formData.name}</div>
          <div><span className="font-medium">Price:</span> ${formData.price}</div>
          <div><span className="font-medium">Category:</span> {formData.category}</div>
          <div><span className="font-medium">Brand:</span> {formData.brand}</div>
          <div><span className="font-medium">Has Variants:</span> {formData.hasVariants ? 'Yes' : 'No'}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Variants Section */}
        {formData.hasVariants ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Product Variants
              </h3>
              <button
                type="button"
                onClick={addVariant}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'border-blue-600 text-blue-400 hover:bg-blue-900' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
              </button>
            </div>

            {variants.map((variant, index) => (
              <div key={variant.id} className={`p-6 rounded-lg border ${cardClasses}`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium">Variant {index + 1}</h4>
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode 
                          ? 'text-red-400 hover:bg-red-900' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Color Selection */}
                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <Palette className="w-4 h-4 mr-2" />
                      Color
                    </label>
                    <select
                      value={variant.color}
                      onChange={(e) => {
                        const selectedColor = colors.find(c => c.name === e.target.value);
                        handleVariantChange(index, 'color', e.target.value);
                        handleVariantChange(index, 'colorHex', selectedColor?.hex || '');
                      }}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
                      required
                    >
                      <option value="">Select Color</option>
                      {colors.map(color => (
                        <option key={color.name} value={color.name}>{color.name}</option>
                      ))}
                    </select>
                    {variant.color && (
                      <div className="mt-2 flex items-center">
                        <div 
                          className="w-6 h-6 rounded border-2 border-gray-300 mr-2"
                          style={{ 
                            background: variant.color === 'Multicolored' 
                              ? 'linear-gradient(45deg, #FF0000, #00FF00, #0000FF)' 
                              : variant.colorHex 
                          }}
                        ></div>
                        <span className="text-sm">{variant.colorHex}</span>
                      </div>
                    )}
                  </div>

                  {/* Size Selection */}
                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <Ruler className="w-4 h-4 mr-2" />
                      Size
                    </label>
                    <select
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
                      required
                    >
                      <option value="">Select Size</option>
                      {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <Package className="w-4 h-4 mr-2" />
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                      min="0"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                {/* Variant Images */}
                <div className={`p-6 rounded-lg border-2 border-dashed transition-colors ${
                  darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
                }`}>
                  <div className="text-center">
                    <Image className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <h4 className="font-medium mb-2">Images for {variant.color} - {variant.size}</h4>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Upload images specific to this variant
                    </p>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg border transition-colors text-sm ${
                        darkMode 
                          ? 'border-gray-600 hover:bg-gray-600' 
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      Choose Images
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Default Media Upload (No Variants) */
          <div className="space-y-6">
            {/* Image Upload */}
            <div className={`p-8 rounded-lg border-2 border-dashed transition-colors ${
              darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="text-center">
                <Image className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className="text-lg font-medium mb-2">Upload Product Images</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Drag and drop your images here, or click to browse
                </p>
                <button
                  type="button"
                  className={`px-6 py-2 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'border-gray-600 hover:bg-gray-700' 
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  Choose Images
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Upload (Same for both variants and non-variants) */}
        <div className={`p-8 rounded-lg border-2 border-dashed transition-colors ${
          darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'
        }`}>
          <div className="text-center">
            <Video className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className="text-lg font-medium mb-2">Upload Product Videos</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Add videos to showcase your product (optional)
            </p>
            <button
              type="button"
              className={`px-6 py-2 rounded-lg border transition-colors ${
                darkMode 
                  ? 'border-gray-600 hover:bg-gray-700' 
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              Choose Videos
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg border font-medium transition-colors ${
            darkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          Back
        </button>
        <button
          type="button"
          className={`w-full sm:w-auto flex items-center justify-center px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            darkMode 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          } shadow-lg hover:shadow-xl`}
        >
          <Check className="w-5 h-5 mr-2" />
          Publish Product
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 text-center sm:text-left">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Create a new product listing for your store
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
              darkMode 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 1 
                  ? 'border-blue-600 bg-blue-600 text-white' 
                  : darkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium text-sm sm:text-base">Product Info</span>
            </div>
            <div className={`w-8 sm:w-12 h-1 rounded ${currentStep >= 2 ? 'bg-blue-600' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 2 
                  ? 'border-blue-600 bg-blue-600 text-white' 
                  : darkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium text-sm sm:text-base">Media Upload</span>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className={`rounded-xl border shadow-lg ${cardClasses} p-4 sm:p-8`}>
          {currentStep === 1 ? <ProductInfoStep /> : <MediaUploadStep />}
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpload;