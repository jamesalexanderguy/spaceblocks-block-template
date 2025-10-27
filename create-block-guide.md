# Creating Blocks - Quick Reference Guide

## Command Template

```bash
npx @wordpress/create-block BLOCKNAME \
  --namespace=bloktastik \
  --category=CATEGORY \
  --no-plugin \
  --template=/Users/admin/Desktop/Dev/block-templates/spaceblocks-block \
  --target-dir=src/blocks/BLOCKNAME
```

**Replace:**
- `BLOCKNAME` - Your block's slug (lowercase, hyphens for spaces)
- `CATEGORY` - WordPress block category (see list below)

---

## Common Block Categories

- `text` - Text-based blocks (paragraphs, headings, lists)
- `media` - Images, video, audio, galleries
- `design` - Layout and design elements (spacers, separators, columns)
- `widgets` - Interactive elements (buttons, forms, CTAs)
- `theme` - Theme-specific blocks (headers, footers, custom sections)
- `embed` - Third-party embeds (YouTube, Twitter, etc.)

---

## Real-World Examples

### Hero Section Block
```bash
npx @wordpress/create-block hero \
  --namespace=bloktastik \
  --category=design \
  --no-plugin \
  --template=/Users/admin/Desktop/Dev/block-templates/spaceblocks-block \
  --target-dir=src/blocks/hero
```

### Call-to-Action Block
```bash
npx @wordpress/create-block cta \
  --namespace=bloktastik \
  --category=widgets \
  --no-plugin \
  --template=/Users/admin/Desktop/Dev/block-templates/spaceblocks-block \
  --target-dir=src/blocks/cta
```

### Testimonial Block
```bash
npx @wordpress/create-block testimonial \
  --namespace=bloktastik \
  --category=text \
  --no-plugin \
  --template=/Users/admin/Desktop/Dev/block-templates/spaceblocks-block \
  --target-dir=src/blocks/testimonial
```

### Feature Grid Block
```bash
npx @wordpress/create-block features \
  --namespace=bloktastik \
  --category=design \
  --no-plugin \
  --template=/Users/admin/Desktop/Dev/block-templates/spaceblocks-block \
  --target-dir=src/blocks/features
```

### Team Member Card
```bash
npx @wordpress/create-block team-card \
  --namespace=bloktastik \
  --category=theme \
  --no-plugin \
  --template=/Users/admin/Desktop/Dev/block-templates/spaceblocks-block \
  --target-dir=src/blocks/team-card
```

---

## After Creating a Block

### 1. Build the block:
```bash
npm run build
```

### 2. Refresh WordPress editor:
- Hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+F5** (Windows)

### 3. Find your block:
- Click **+** button in editor
- Search for your block name
- Block appears under "Bloktastik" category

---

## Generated Files

Your new block will have these files in `src/blocks/BLOCKNAME/`:

```
src/blocks/BLOCKNAME/
├── components.js      # Shared presentational components
├── edit.js           # What you see in the editor
├── save.js           # What gets saved to the database
├── style.scss        # Styles for both editor and frontend
├── editor.scss       # Editor-only styles (if needed)
├── index.js          # Block registration
└── block.json        # Block metadata and configuration
```

---

## Customization Workflow

### 1. Design Your Block (components.js)

Write shared markup once:

```javascript
export function MyBlockContent({ children, className = '' }) {
	return (
		<div className={`bg-blue-500 text-white p-8 rounded-lg ${className}`}>
			<h2 className="text-3xl font-bold mb-4">
				{children}
			</h2>
		</div>
	);
}
```

### 2. Use in Editor (edit.js)

```javascript
import { useBlockProps } from '@wordpress/block-editor';
import { MyBlockContent } from './components';

export default function Edit() {
	return (
		<div {...useBlockProps()}>
			<MyBlockContent>
				Edit your content here
			</MyBlockContent>
		</div>
	);
}
```

### 3. Use on Frontend (save.js)

```javascript
import { useBlockProps } from '@wordpress/block-editor';
import { MyBlockContent } from './components';

export default function save() {
	return (
		<div {...useBlockProps.save()}>
			<MyBlockContent>
				Saved content appears here
			</MyBlockContent>
		</div>
	);
}
```

### 4. Add Custom Styles (style.scss)

```scss
.wp-block-bloktastik-BLOCKNAME {
	// Custom animations
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.animated-element {
		animation: fadeIn 0.5s ease-in;
	}

	// Complex hover effects
	&:hover {
		.hover-target {
			transform: scale(1.05);
			transition: transform 0.3s;
		}
	}
}
```

### 5. Rebuild

```bash
npm run build
```

---

## Styling Options

### Use Tailwind Classes (Recommended)

```javascript
// In components.js or edit.js/save.js
<div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl shadow-2xl">
	<h2 className="text-4xl font-bold text-white mb-4">
		Content
	</h2>
</div>
```

**Benefits:**
- Fast development
- Consistent design system
- Automatically purged (only used classes included)

### Use Custom SCSS (For Complex Needs)

```scss
// In style.scss
.wp-block-bloktastik-myblock {
	// Animations, gradients, complex selectors
	@keyframes slideIn {
		from { transform: translateX(-100%); }
		to { transform: translateX(0); }
	}

	.slide-element {
		animation: slideIn 0.6s ease-out;
	}

	// Pseudo-elements
	&::before {
		content: '';
		position: absolute;
		background: linear-gradient(45deg, #f00, #00f);
	}
}
```

---

## Common Patterns

### Block with Image and Text

```javascript
// components.js
export function ImageTextContent({ imageSrc, title, description }) {
	return (
		<div className="flex gap-6 items-center">
			<img src={imageSrc} className="w-48 h-48 rounded-lg object-cover" />
			<div>
				<h3 className="text-2xl font-bold mb-2">{title}</h3>
				<p className="text-gray-600">{description}</p>
			</div>
		</div>
	);
}
```

### Block with Multiple Columns

```javascript
// components.js
export function ColumnsContent({ columns }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{columns.map((column, index) => (
				<div key={index} className="bg-white p-6 rounded-lg shadow">
					{column}
				</div>
			))}
		</div>
	);
}
```

### Block with Icon

```javascript
// components.js
export function IconBlockContent({ icon, title, text }) {
	return (
		<div className="text-center">
			<div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
				<span className="text-white text-2xl">{icon}</span>
			</div>
			<h4 className="font-bold mb-2">{title}</h4>
			<p className="text-gray-600">{text}</p>
		</div>
	);
}
```

---

## Troubleshooting

### Block Not Appearing in Editor

```bash
# Rebuild
npm run build

# Hard refresh browser
Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)

# Check for errors in browser console (F12)
```

### Styles Not Showing

```bash
# Verify build succeeded
npm run build

# Check that blocks.css was created
ls build/blocks.css

# Hard refresh browser
```

### Import Errors

```javascript
// Make sure you're importing from the right path
import { MyComponent } from './components';  // Correct
import { MyComponent } from '../components'; // Wrong (unless in subdirectory)
```

### Block Validation Error

This happens when you change the `save.js` markup after saving the block:

1. Delete the block from your page
2. Re-add it fresh
3. Save the page

---

## Advanced: Adding Block Attributes

To make blocks customizable (colors, text, images, etc.), add attributes to `block.json`:

```json
{
	"attributes": {
		"title": {
			"type": "string",
			"default": "Default Title"
		},
		"backgroundColor": {
			"type": "string",
			"default": "#000000"
		}
	}
}
```

Then use in `edit.js` and `save.js`:

```javascript
export default function Edit({ attributes, setAttributes }) {
	const { title, backgroundColor } = attributes;
	
	return (
		<div {...useBlockProps()} style={{ backgroundColor }}>
			<input 
				value={title}
				onChange={(e) => setAttributes({ title: e.target.value })}
			/>
		</div>
	);
}
```

---

## Quick Command Reference

```bash
# Create new block
npx @wordpress/create-block BLOCKNAME --namespace=bloktastik --category=CATEGORY --no-plugin --template=/Users/admin/Desktop/Dev/block-templates/spaceblocks-block --target-dir=src/blocks/BLOCKNAME

# Build for production
npm run build

# Watch mode (auto-rebuild on changes)
npm start

# Format code
npm run format
```

---

## Tips

✅ **DO:**
- Use shared components for consistent markup
- Use Tailwind classes for common styles
- Scope custom SCSS to your block class
- Test in both editor and frontend
- Use semantic HTML elements

❌ **DON'T:**
- Duplicate markup between `edit.js` and `save.js`
- Use inline styles when Tailwind utilities exist
- Forget to rebuild after changes
- Ignore browser console errors
- Change `save.js` without understanding block validation

---

**Happy Block Building! 🎉**
