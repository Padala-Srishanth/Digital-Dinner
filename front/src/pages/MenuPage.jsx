import { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';
import CategoryFilter from '../components/CategoryFilter';
import { menuService } from '../services/api';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categories = ['Appetizer', 'Main Course', 'Dessert', 'Drink'];
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const data = await menuService.getMenuItems(selectedCategory);
        setMenuItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to load menu items. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenuItems();
  }, [selectedCategory]);
  
  return (
    <div className="menu-page">
      <h2>Our Menu</h2>
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      {loading && <p>Loading menu items...</p>}
      
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && (
        <div className="menu-items-grid">
          {menuItems.length > 0 ? (
            menuItems.map((item) => <MenuItem key={item._id} item={{...item, id: item._id}} />)
          ) : (
            <p>No menu items found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MenuPage;
