function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
    return (
      <div className="category-filter">
        <button
          className={selectedCategory === null ? 'active' : ''}
          onClick={() => onSelectCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
  
  export default CategoryFilter;