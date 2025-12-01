### Get Shop Minis Version Info (CLI)

Source: https://shopify.dev/docs/api/shop-minis/commands/info

Execute the 'shop-minis info' command to display version details of your OS, Node.js, npm, and other relevant development tools. This command is useful for diagnosing compatibility issues or understanding your current environment setup. The --verbose flag provides additional debugging output.

```bash
npx shop-minis info [options]
```

--------------------------------

### Create Shop Mini Command (CLI)

Source: https://shopify.dev/docs/api/shop-minis/commands/create

Scaffolds a new Shop Mini project using the 'create' command. This command initializes a new Mini project from an example template, installs dependencies, and sets up the project structure. It requires the 'mini name' and optionally accepts '--output-dir' and '--verbose' flags.

```bash
npx shop-minis create [options] [mini name]
```

--------------------------------

### Set Up New Mini Project with Default Options

Source: https://shopify.dev/docs/api/shop-minis/commands/setup

Executes the default setup for a new Shopify Mini project. This command registers the Mini with Shopify Partners, links it to your organization, generates API keys, and saves them to your .env file. No external dependencies are required beyond the shop-minis CLI.

```shell
npx shop-minis setup [options]
```

--------------------------------

### Shop Mini Manifest Structure Example

Source: https://shopify.dev/docs/api/shop-minis/manifest-file

An example of a complete `manifest.json` file for a Shop Mini. This file defines the core configuration, including permissions, scopes, and trusted domains, which are validated during the submission process.

```json
{
  "name": "My Shop Mini",
  "version": "1.0.0",
  "description": "A sample Shop Mini.",
  "permissions": [
    "CAMERA",
    "MICROPHONE"
  ],
  "scopes": [
    "profile",
    "orders"
  ],
  "trusted_domains": [
    "example.com",
    "api.example.com/v1"
  ]
}
```

--------------------------------

### Install Dependency with Shopify CLI

Source: https://shopify.dev/docs/api/shop-minis/commands/install

Installs a specified dependency, allowing version pinning (e.g., react@^18.0.0). This is the primary command for adding new packages to your project.

```bash
npx shop-minis install [options] [dependency]
```

--------------------------------

### Shopify Shop Minis React Progress Component Examples

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/progress

Provides examples of the Progress component in different states: half progress (50% completion) and complete progress (100% completion). These examples showcase how to configure the 'value' prop to represent various stages of progress.

```javascript
import {Progress} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return <Progress value={50} />
}
```

```javascript
import {Progress} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return <Progress value={100} />
}
```

--------------------------------

### Install Lucide React Icon Library for Shop Minis

Source: https://shopify.dev/docs/api/shop-minis/design

This command installs the Lucide React icon library, which is recommended for use in Shop Minis due to its consistent design, customizability, and cross-platform rendering. Icons should be preferred over emojis for UI elements.

```bash
npx shop-minis install lucide-react
```

--------------------------------

### Check Dependencies with Shopify CLI

Source: https://shopify.dev/docs/api/shop-minis/commands/install

Checks if installed dependencies are valid and up-to-date. This command can be used with the `--fix` option to automatically resolve issues or with `--json` to output results in a machine-readable format.

```bash
npx shop-minis install --check [dependency]
npx shop-minis install --check --json [dependency]
npx shop-minis install --fix [dependency]
```

--------------------------------

### Basic TransitionLink Usage in React

Source: https://shopify.dev/docs/api/shop-minis/shop-minis/components/TransitionLink

Demonstrates the basic setup for using TransitionLink components within a MinisRouter. This example shows how to create navigation links for Home, Products, and Cart, ensuring that the MinisRouter is configured with the 'viewTransitions' prop enabled for animated page changes.

```javascript
import React from 'react'
import {MinisRouter, TransitionLink} from '@shopify/shop-minis-react'
import {Routes, Route} from 'react-router'

function Navigation() {
  return (
    <nav>
      <TransitionLink to="/">Home</TransitionLink>
      <TransitionLink to="/products">Products</TransitionLink>
      <TransitionLink to="/cart">Cart</TransitionLink>
    </nav>
  )
}

function App() {
  return (
    <div>
      <MinisRouter viewTransitions>
        <Routes>
          <Route path="/" element={<Navigation />} />
        </Routes>
      </MinisRouter>
    </div>
  )
}

export default App

```

--------------------------------

### React Input Component Examples - Shopify Shop Minis

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/input

Demonstrates the usage of the Input component from '@shopify/shop-minis-react'. It shows how to set placeholders, initial values, and handle input changes. This component is built using React.

```jsx
import {Input} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<Input
placeholder="Enter text..."
value="This is an input"
onChange={e => console.log(e.target.value)}
/>
)
}
```

```jsx
import {Input} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <Input
      placeholder="Enter text..."
      value="This is an input"
      onChange={e => console.log(e.target.value)}
    />
  )
}
```

```jsx
import {Input} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return <Input value="This is an input" />
}
```

```jsx
import {Input} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return <Input disabled value="Disabled input" />
}
```

--------------------------------

### useSecureStorage Hook Example (React)

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/usesecurestorage

This example demonstrates how to use the `useSecureStorage` hook to get, set, and remove secrets from secure storage within a React component. It utilizes `useEffect` to perform these operations asynchronously.

```javascript
import { useEffect } from 'react'

import { useSecureStorage } from '@shopify/shop-minis-react'

export default function MyComponent() {
  const { getSecret, setSecret, removeSecret } = useSecureStorage()

  useEffect(() => {
    async function handleSecureStorageOperations() {
      // Get a secret from secure storage
      const secret = await getSecret()
      console.log({ secret })

      // Set a secret in secure storage
      await setSecret({ value: 'Sensitive Data' })

      // Remove a secret from secure storage
      await removeSecret()
    }

    handleSecureStorageOperations()
  }, [getSecret, setSecret, removeSecret])
}
```

--------------------------------

### React Navigation with Click Tracking and Confirmation

Source: https://shopify.dev/docs/api/shop-minis/shop-minis/components/TransitionLink

This React component uses the TransitionLink from '@shopify/shop-minis-react' to implement navigation. It includes an example of how to track link clicks for analytics purposes and how to add a confirmation prompt before navigating to the checkout page. Ensure '@shopify/shop-minis-react' is installed as a dependency.

```javascript
import React from 'react'
import {TransitionLink} from '@shopify/shop-minis-react'

function NavigationWithAnalytics() {
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Track analytics event
    console.log('Navigation clicked:', event.currentTarget.href)

    // You can prevent navigation by calling event.preventDefault()
    // event.preventDefault()
  }

  return (
    <div>
      <TransitionLink
        to="/products/special-offer"
        onClick={handleLinkClick}
      >
        Special Offer - Click tracking enabled
      </TransitionLink>

      <TransitionLink
        to="/checkout"
        onClick={(e) => {
          // Confirm before navigating
          const confirmed = window.confirm('Proceed to checkout?')
          if (!confirmed) {
            e.preventDefault()
          }
        }}
      >
        Proceed to Checkout
      </TransitionLink>
    </div>
  )
}

export default NavigationWithAnalytics
```

--------------------------------

### Run Shopify Mini Features Command

Source: https://shopify.dev/docs/api/shop-minis/commands/features

Executes the shop-minis features command with various options. This command is used to manage experimental or beta features in your Shopify Mini. Ensure you have the shop-minis CLI installed.

```bash
npx shop-minis features [options]
```

--------------------------------

### React Image Component: Custom Styling

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/image

Example showing how to apply custom styling to the Image component, including setting a custom aspect ratio for responsive layouts.

```javascript
import {Image} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <Image
      src="https://cdn.shopify.com/example/custom-styled-image.jpg"
      alt="Custom styled image"
      className="w-1/2 mx-auto my-8 rounded-lg shadow-xl"
      aspectRatio={16/9}
    />
  )
}
```

--------------------------------

### Image Upload and Content Creation Example (React)

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/useCreateImageContent

Demonstrates how to use `useCreateImageContent` and `useImagePicker` hooks from '@shopify/shop-minis-react' to capture an image from the camera or gallery and upload it as content. It shows how to handle loading states and potential errors.

```javascript
import {
useCreateImageContent,
useImagePicker,
Button,
} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
const {createImageContent, loading} = useCreateImageContent()
const {openCamera, openGallery} = useImagePicker()
  
const handleCameraCapture = async () => {
try {
const file = await openCamera()
const result = await createImageContent({
image: file,
contentTitle: 'Photo from camera',
visibility: ['DISCOVERABLE', 'LINKABLE'],
})
console.log({data: result.data, userErrors: result.userErrors})
} catch (error) {
console.error('Failed to capture and upload image:', error)
}
}
  
const handleGallerySelect = async () => {
try {
const file = await openGallery()
const result = await createImageContent({
image: file,
contentTitle: 'Photo from gallery',
// Visibility options:
// - ['DISCOVERABLE'] - Appears in Shop recommendations
// - ['LINKABLE'] - Enables shareable URLs
// - ['DISCOVERABLE', 'LINKABLE'] - Both features
// - null or [] - Private within Mini only
visibility: ['DISCOVERABLE', 'LINKABLE'],
})
console.log({data: result.data, userErrors: result.userErrors})
} catch (error) {
console.error('Failed to select and upload image:', error)
}
}

return (
<>
<Button onClick={handleCameraCapture} disabled={loading}>
Take Photo and Upload
</Button>
<Button onClick={handleGallerySelect} disabled={loading}>
Select from Gallery and Upload
</Button>
{loading && <p>Uploading image...</p>}
</>
)
}

```

--------------------------------

### Shopify Shop Minis IconButton Small Size Example

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/iconbutton

Illustrates how to render a small-sized IconButton with a custom icon (Star) and a click handler. This example depends on 'lucide-react' for the icon and '@shopify/shop-minis-react' for the component.

```jsx
import { IconButton } from '@shopify/shop-minis-react'
import { Star } from 'lucide-react'

export default function MyComponent() {
  const handleClick = () => {
    console.log('Small icon button clicked')
  }

  return (
    <IconButton
      Icon={Star}
      size="sm"
      onClick={handleClick}
    />
  )
}
```

--------------------------------

### Shopify Shop Minis IconButton Default and Filled Examples

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/iconbutton

Demonstrates the basic usage of the IconButton component, showing both a default state and a 'filled' state. This component requires the '@shopify/shop-minis-react' library.

```jsx
import React from 'react'
  
import {FavoriteButton} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<div className="flex items-center gap-4">
<FavoriteButton />
<FavoriteButton filled />
</div>
)
}
```

--------------------------------

### Path Navigation with useNavigateWithTransition

Source: https://shopify.dev/docs/api/shop-minis/shop-minis/hooks/useNavigateWithTransition

Illustrates navigating to different product and category pages, as well as the checkout page with query parameters, using the useNavigateWithTransition hook. This example highlights dynamic route generation and URL parameter usage. It depends on @shopify/shop-minis-react.

```jsx
import React from 'react'
import {useNavigateWithTransition, Button} from '@shopify/shop-minis-react'

function ProductActions({productId}: {productId: string}) {
  const navigateWithTransition = useNavigateWithTransition()

  const handleViewDetails = () => {
    // Navigate to product details page with smooth transition
    navigateWithTransition(`/products/${productId}`)
  }

  const handleViewCategory = (category: string) => {
    // Navigate to category page
    navigateWithTransition(`/categories/${category}`)
  }

  const handleCheckout = () => {
    // Navigate to checkout with query parameters
    navigateWithTransition('/checkout?step=shipping')
  }

  return (
    <div>
      <Button onPress={handleViewDetails}>
        View Product Details
      </Button>
      <Button onPress={() => handleViewCategory('electronics')}>
        Browse Electronics
      </Button>
      <Button onPress={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  )
}

export default ProductActions
```

--------------------------------

### Run Shop Minis Dev Server with Specific Host IP

Source: https://shopify.dev/docs/api/shop-minis/troubleshooting

This command allows you to run the shop-minis development server and explicitly set the host IP address. This can be useful for troubleshooting connection issues, especially when devices are on different network segments or firewalls are interfering. It requires the 'shop-minis' package to be installed.

```bash
npx shop-minis dev --host 192.168.1.100
```

--------------------------------

### Shopify Checkbox Component - Default Usage (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/checkbox

Demonstrates the basic usage of the Checkbox component from '@shopify/shop-minis-react'. This example shows how to import and render a default checkbox.

```javascript
import {Checkbox} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return <Checkbox checked />
}
```

--------------------------------

### GET /reports/get

Source: https://shopify.dev/docs/api/shop-minis/commands/reports-get

Downloads analytics data for a specific report type and date. Reports are typically in CSV format for easy analysis in spreadsheets or data tools.

```APIDOC
## GET /reports/get

### Description
Downloads analytics data for a specific report type and date. Reports are typically in CSV format for easy analysis in spreadsheets or data tools. Complete the workflow: list → dates → get to access your Mini's analytics.

### Method
GET

### Endpoint
/reports/get

### Parameters
#### Query Parameters
- **report-type** (string) - Required - The report type (see `reports list`).
- **date** (string) - Required - The date for the report in UTC (YYYY-MM-DD format).
- **--output** (string) - Optional - Output file path (defaults to report__.csv).

### Request Example
```bash
npx shop-minis reports get [options] <report-type> <date>
```

### Response
#### Success Response (200)
- **report data** (CSV) - The analytics data for the specified report type and date.

#### Response Example
```csv
Date,Orders,Revenue
2023-10-27,100,5000.00
2023-10-28,120,6000.00
```
```

--------------------------------

### Touchable Component Usage in React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/touchable

This example demonstrates how to use the 'Touchable' component from '@shopify/shop-minis-react'. It wraps content and provides a visual tap feedback. The component requires importing 'Touchable' and can accept an 'onClick' handler to perform actions when tapped.

```jsx
import {Touchable} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
  const handleClick = () => {
    console.log('Touchable clicked')
  }
  
  return (
    <Touchable onClick={handleClick}>
      <div>Continue</div>
    </Touchable>
  )
}
```

--------------------------------

### Virtualized List with Custom Rendering (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/list

A basic implementation of the virtualized List component using React. It efficiently renders a list of items with customizable content for each item. This example shows how to integrate the `List` component with a `renderItem` function to display simple text-based items.

```javascript
import {List} from '@shopify/shop-minis-react'
  
const sampleItems = [
  {id: '1', title: 'Item 1'},
  {id: '2', title: 'Item 2'},
  {id: '3', title: 'Item 3'},
  {id: '4', title: 'Item 4'},
  {id: '5', title: 'Item 5'},
]
  
export default function MyComponent() {
  const renderItem = (item: (typeof sampleItems)[number]) => (
    <div className="p-4 border-b">
      <span>{item.title}</span>
    </div>
  )
  
  return (
    <List
      items={sampleItems}
      height={300}
      showScrollbar
      renderItem={renderItem}
    />
  )
}
```

--------------------------------

### Virtualized Product List Rendering (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/list

This example demonstrates how to use the `List` component to display a list of product items. It utilizes the `ProductLink` component for rendering individual product information, suitable for e-commerce applications. The `itemSizeForRow` prop is used to define the height of each product item in the list.

```javascript
import {List, ProductLink} from '@shopify/shop-minis-react'

const sampleProducts = [
  {
    id: '1',
    title: 'Sample Product 1',
    price: {amount: '29.99', currencyCode: 'USD'},
    featuredImage: {url: 'https://picsum.photos/200/200', altText: 'Product 1'},
    shop: {id: 'shop1', name: 'Sample Shop'},
    defaultVariantId: 'variant-1',
    isFavorited: false,
  },
  {
    id: '2',
    title: 'Sample Product 2',
    price: {amount: '39.99', currencyCode: 'USD'},
    featuredImage: {url: 'https://picsum.photos/200/200', altText: 'Product 2'},
    shop: {id: 'shop1', name: 'Sample Shop'},
    defaultVariantId: 'variant-2',
    isFavorited: true,
  },
]

export default function MyComponent() {
  const getItemSize = () => 100

  const renderItem = product => (
    <div className="p-4">
      <ProductLink product={product} />
    </div>
  )

  return (
    <List
      items={sampleProducts}
      height={400}
      itemSizeForRow={getItemSize}
      showScrollbar
      renderItem={renderItem}
    />
  )
}
```

--------------------------------

### React Component for Image Upload with Shop Minis API

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/usecreateimagecontent

An example React component demonstrating how to use `useCreateImageContent` and `useImagePicker` hooks from '@shopify/shop-minis-react'. It allows users to capture images via the camera or select them from the gallery and upload them. The component handles loading states and logs results or errors.

```javascript
import {
useCreateImageContent,
useImagePicker,
Button,
} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
const {createImageContent, loading} = useCreateImageContent()
const {openCamera, openGallery} = useImagePicker()
  
const handleCameraCapture = async () => {
try {
const file = await openCamera()
const result = await createImageContent({
image: file,
contentTitle: 'Photo from camera',
visibility: ['DISCOVERABLE', 'LINKABLE'],
})
console.log({data: result.data, userErrors: result.userErrors})
} catch (error) {
console.error('Failed to capture and upload image:', error)
}
}
  
const handleGallerySelect = async () => {
try {
const file = await openGallery()
const result = await createImageContent({
image: file,
contentTitle: 'Photo from gallery',
// Visibility options:
// - ['DISCOVERABLE'] - Appears in Shop recommendations
// - ['LINKABLE'] - Enables shareable URLs
// - ['DISCOVERABLE', 'LINKABLE'] - Both features
// - null or [] - Private within Mini only
visibility: ['DISCOVERABLE', 'LINKABLE'],
})
console.log({data: result.data, userErrors: result.userErrors})
} catch (error) {
console.error('Failed to select and upload image:', error)
}
}

return (
<>
<Button onClick={handleCameraCapture} disabled={loading}>
Take Photo and Upload
</Button>
<Button onClick={handleGallerySelect} disabled={loading}>
Select from Gallery and Upload
</Button>
{loading && <p>Uploading image...</p>}
</>
)
}
```

--------------------------------

### List Available Report Types using Shop Minis CLI

Source: https://shopify.dev/docs/api/shop-minis/commands/reports-list

This command lists all available analytics report types for your Shopify Mini. Use this to understand the kinds of insights you can gain before specifying dates or downloading specific reports. It requires the shop-minis CLI to be installed.

```bash
npx shop-minis reports list
```

--------------------------------

### Shopify Shop Minis IconButton Large Size Example

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/iconbutton

Demonstrates the usage of a large-sized IconButton, using a Settings icon and defining a click event. This snippet requires 'lucide-react' for the icon and '@shopify/shop-minis-react' for the IconButton component.

```jsx
import { IconButton } from '@shopify/shop-minis-react'
import { Settings } from 'lucide-react'

export default function MyComponent() {
  const handleClick = () => {
    console.log('Large icon button clicked')
  }

  return <IconButton Icon={Settings} size="lg" onClick={handleClick} />
}
```

--------------------------------

### Destructive Badge Styling (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/badge

Provides a React code example for the destructive variant of the Badge component from '@shopify/shop-minis-react'. This styling is intended for warnings or error indicators.

```jsx
import {Badge} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return <Badge variant="destructive">Destructive</Badge>
}


```

--------------------------------

### Download Report by Type and Date (CLI)

Source: https://shopify.dev/docs/api/shop-minis/commands/reports-get

This command downloads analytics data for a specific report type and date. Reports are typically in CSV format. It requires the report type and date as arguments and optionally accepts an output file path. The date must be in UTC YYYY-MM-DD format.

```bash
npx shop-minis reports get [options] <report-type> <date>
```

--------------------------------

### Forward Android ADB Port for Mini Development

Source: https://shopify.dev/docs/api/shop-minis/troubleshooting

This command uses Android Debug Bridge (ADB) to forward traffic from a specific port on the Android device to a corresponding port on the development machine. This is crucial for allowing the Shopify Shop app on an Android device to connect to the Mini's development server, overcoming potential network restrictions. It requires ADB to be installed and configured, and the Android device to be connected via USB with developer options enabled.

```bash
adb reverse tcp:5173 tcp:5173
```

--------------------------------

### QuantitySelector with Max Value (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/quantityselector

This example shows how to configure the QuantitySelector with a maximum allowable quantity. It uses the 'maxQuantity' prop to set the upper limit for the quantity adjustment. The 'onQuantityChange' callback is essential for receiving updates.

```javascript
import {QuantitySelector} from '@shopify/shop-minis-react'

export default function MyComponent() {
  const handleQuantityChange = newQuantity => {
    console.log('Quantity changed to:', newQuantity)
  }

  return (
    <QuantitySelector
      quantity={1}
      onQuantityChange={handleQuantityChange}
      maxQuantity={10}
    />
  )
}
```

--------------------------------

### Interface for Getting an Async Storage Item

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useAsyncStorage

Defines the parameter object required for the `getItem` function within the `useAsyncStorage` hook, specifying the key of the item to retrieve.

```typescript
export interface GetAsyncStorageItemParams {
  key: string
}
```

--------------------------------

### Styled TransitionLink with Custom Classes and Styles

Source: https://shopify.dev/docs/api/shop-minis/shop-minis/components/TransitionLink

Illustrates how to apply custom CSS classes and inline styles to TransitionLink components for distinct visual appearances. This example shows styling for a product details link and a shopping cart link, including adding a cart count indicator.

```javascript
import React from 'react'
import {TransitionLink} from '@shopify/shop-minis-react'

function StyledNavigation() {
  return (
    <nav className="navigation">
      <TransitionLink
        to="/products/123"
        className="product-link"
        style={{ color: '#007AFF', textDecoration: 'none' }}
      >
        View Product Details
      </TransitionLink>

      <TransitionLink
        to="/cart"
        className="cart-link"
        aria-label="Go to shopping cart"
      >
        <span>Shopping Cart</span>
        <span className="cart-count">(3)</span>
      </TransitionLink>
    </nav>
  )
}

export default StyledNavigation

```

--------------------------------

### Interact with Secure Storage using useSecureStorage Hook

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useSecureStorage

Demonstrates how to use the `useSecureStorage` hook to get, set, and remove secrets from secure storage. This hook is suitable for sensitive data requiring hardware-backed encryption. It returns functions `getSecret`, `setSecret`, and `removeSecret`.

```javascript
import { useEffect } from 'react';
import { useSecureStorage } from '@shopify/shop-minis-react';

export default function MyComponent() {
  const { getSecret, setSecret, removeSecret } = useSecureStorage();

  useEffect(() => {
    async function handleSecureStorageOperations() {
      // Get a secret from secure storage
      const secret = await getSecret();
      console.log({ secret });

      // Set a secret in secure storage
      await setSecret({ value: 'Sensitive Data' });

      // Remove a secret from secure storage
      await removeSecret();
    }

    handleSecureStorageOperations();
  }, [getSecret, setSecret, removeSecret]);
}
```

--------------------------------

### Use Async Storage Hook and Operations

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useAsyncStorage

This snippet demonstrates how to use the `useAsyncStorage` hook to perform common storage operations: getting an item, setting an item, removing an item, retrieving all keys, and clearing all items. It utilizes `useEffect` to manage these asynchronous operations within a React component.

```javascript
import {useEffect} from 'react'

import {useAsyncStorage} from '@shopify/shop-minis-react'

export default function MyComponent() {
  const {getItem, setItem, removeItem, getAllKeys, clear} = useAsyncStorage()

  useEffect(() => {
    async function handleStorageOperations() {
      // Get an item from storage
      const value = await getItem({key: 'myKey'})
      console.log({value})

      // Set an item in storage
      await setItem({key: 'myKey', value: 'Hello, World!'})

      // Remove an item from storage
      await removeItem({key: 'myKey'})

      // Get all keys in storage
      const keys = await getAllKeys()
      console.log({keys})

      // Clear all items from storage
      await clear()
    }

    handleStorageOperations()
  }, [getItem, removeItem, setItem, getAllKeys, clear])
}
```

--------------------------------

### Disabled QuantitySelector State (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/quantityselector

This example demonstrates how to disable the QuantitySelector component, making it non-interactive. The 'disabled' prop is a boolean that, when set to true, prevents any changes to the quantity. The 'onQuantityChange' callback will not be triggered when disabled.

```javascript
import {QuantitySelector} from '@shopify/shop-minis-react'

export default function MyComponent() {
  const handleQuantityChange = newQuantity => {
    console.log('Quantity changed to:', newQuantity)
  }

  return (
    <QuantitySelector
      quantity={3}
      onQuantityChange={handleQuantityChange}
      maxQuantity={10}
      disabled
    />
  )
}
```

--------------------------------

### Use Generate User Token Hook in React

Source: https://shopify.dev/docs/api/shop-minis/hooks/usegenerateusertoken

This example demonstrates how to use the useGenerateUserToken hook within a React component. It generates a temporary user token and logs the token, expiration time, and user state to the console. The generated token can be used to authenticate requests to your backend.

```javascript
import { useCallback } from 'react';
import { useGenerateUserToken, Button } from '@shopify/shop-minis-react';

export default function MyComponent() {
  const { generateUserToken } = useGenerateUserToken();

  const performRequest = useCallback(async () => {
    const { data } = await generateUserToken();
    const { token, expiresAt, userState } = data;

    console.log({ token, expiresAt, userState });
  }, [generateUserToken]);

  return <Button onPress={performRequest} text="Perform request" />;
}
```

--------------------------------

### Crafting an Effective Mini Description

Source: https://shopify.dev/docs/api/shop-minis/manifest-file

The `description` field provides a concise summary of your Mini's purpose, displayed to users in the Shop app to aid discovery and understanding. Aim for 30-50 characters, using action-oriented language to highlight the unique value proposition and key features.

```json
{
  "description": "Track your outfits every day"
}
```

--------------------------------

### Submit Shop Mini for Review (CLI)

Source: https://shopify.dev/docs/api/shop-minis/commands/submit

The primary command to submit your Shop Mini for review. It runs checks and validation before uploading. Accepts options for describing changes and enabling debug messages.

```bash
npx shop-minis submit [options]
```

--------------------------------

### Shop Mini Permissions Configuration

Source: https://shopify.dev/docs/api/shop-minis/manifest-file

Defines the native device capabilities your Shop Mini requires. Permissions are requested from the user when your Mini attempts to use them, such as accessing the camera or microphone. Only essential permissions should be requested to avoid review delays.

```json
{
  "permissions": ["CAMERA", "MICROPHONE"]
}
```

--------------------------------

### Navigate with Transitions using useNavigateWithTransition

Source: https://shopify.dev/docs/api/shop-minis/shop-minis/hooks/usenavigatewithtransition

Demonstrates using the useNavigateWithTransition hook for programmatic navigation, including navigating to a specific product and going back in history. Requires @shopify/shop-minis-react.

```javascript
import {useNavigateWithTransition, Button} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
const transitionNavigate = useNavigateWithTransition()
  
const handleProductClick = () => {
transitionNavigate('/products/123')
}
  
const handleGoBack = () => {
transitionNavigate(-1)
}
  
return (
<>
<Button onClick={handleProductClick}>View Product</Button>
<Button onClick={handleGoBack}>Go Back</Button>
</>
)
}
```

--------------------------------

### Path Navigation with Smooth Transitions

Source: https://shopify.dev/docs/api/shop-minis/shop-minis/hooks/usenavigatewithtransition

Illustrates navigating to specific routes, including product details, categories, and checkout with query parameters, using the useNavigateWithTransition hook for a smooth transition experience. It depends on @shopify/shop-minis-react.

```javascript
import React from 'react'
import {useNavigateWithTransition, Button} from '@shopify/shop-minis-react'
  
function ProductActions({productId}: {productId: string}) {
const navigateWithTransition = useNavigateWithTransition()
  
const handleViewDetails = () => {
// Navigate to product details page with smooth transition
navigateWithTransition(`/products/${productId}`)
}
  
const handleViewCategory = (category: string) => {
// Navigate to category page
navigateWithTransition(`/categories/${category}`)
}
  
const handleCheckout = () => {
// Navigate to checkout with query parameters
navigateWithTransition('/checkout?step=shipping')
}
  
return (
<div>
<Button onPress={handleViewDetails}>
View Product Details
</Button>
<Button onPress={() => handleViewCategory('electronics')}>
Browse Electronics
</Button>
<Button onPress={handleCheckout}>
Proceed to Checkout
</Button>
</div>
)
}
  
export default ProductActions
```

--------------------------------

### Basic Navigation Controls with useNavigateWithTransition

Source: https://shopify.dev/docs/api/shop-minis/shop-minis/hooks/useNavigateWithTransition

Demonstrates basic navigation using `useNavigateWithTransition` for moving back or forward in the browser history. It utilizes the hook to navigate by a specified number of steps (e.g., -1 for back, 1 for forward).

```javascript
import React from 'react'
import {useNavigateWithTransition, Button} from '@shopify/shop-minis-react'

function NavigationControls() {
  const navigateWithTransition = useNavigateWithTransition()

  const handleGoBack = () => {
    // Navigate back one page in history with smooth transition
    navigateWithTransition(-1)
  }

  const handleGoBackTwo = () => {
    // Navigate back two pages
    navigateWithTransition(-2)
  }

  const handleGoForward = () => {
    // Navigate forward one page in history
    navigateWithTransition(1)
  }

  return (
    <div className="navigation-controls">
      <Button onPress={handleGoBack}>
        Back
      </Button>
      <Button onPress={handleGoBackTwo}>
        Back to Home
      </Button>
      <Button onPress={handleGoForward}>
        Forward
      </Button>
    </div>
  )
}

export default NavigationControls
```

--------------------------------

### React Image Component: With Thumbhash Placeholder

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/image

Demonstrates the use of `thumbhash` for progressive image loading. A low-quality placeholder is shown initially, improving to the full image once loaded.

```javascript
import {Image} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <Image
      src="https://cdn.shopify.com/example/large-image.jpg"
      thumbhash="HBkSHYSIeHiPiHh8eJd4eTN0D3"
      alt="Product with placeholder"
      className="w-full rounded-lg"
      onLoad={() => console.log('Image loaded')}
    />
  )
}
```

--------------------------------

### React Image Component: Default Usage

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/image

Demonstrates the basic usage of the Image component, rendering a remote image with specified source, alt text, thumbhash for progressive loading, and aspect ratio.

```javascript
import React from 'react'
  
import {Image} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<Image
src="https://images.unsplash.com/photo-1551524164-687a55dd1126?w=400&h=400&fit=crop&crop=center"
alt="The Hero Snowboard"
thumbhash="NwgGBQD3qIt2+EkWqHqGV4tgd0EH"
aspectRatio={1}
/>
)
}
```

--------------------------------

### Basic TransitionLink Usage in React

Source: https://shopify.dev/docs/api/shop-minis/shop-minis/components/transitionlink

Demonstrates the basic implementation of TransitionLink for navigation within a Shopify Mini application. It requires importing TransitionLink and MinisRouter from '@shopify/shop-minis-react' and setting up Routes and Route from 'react-router'. View transitions must be enabled in MinisRouter for animations to function.

```jsx
import React from 'react'
import {MinisRouter, TransitionLink} from '@shopify/shop-minis-react'
import {Routes, Route} from 'react-router'
  
function Navigation() {
  return (
    <nav>
      <TransitionLink to="/">Home</TransitionLink>
      <TransitionLink to="/products">Products</TransitionLink>
      <TransitionLink to="/cart">Cart</TransitionLink>
    </nav>
  )
}
  
function App() {
  return (
    <div>
      <MinisRouter viewTransitions>
        <Routes>
          <Route path="/" element={<Navigation />} />
        </Routes>
      </MinisRouter>
    </div>
  )
}
  
export default App
  
```

--------------------------------

### Enable a Specific Feature using shop-minis CLI

Source: https://shopify.dev/docs/api/shop-minis/commands/features

Enables a particular experimental or beta feature in your Shopify Mini. Replace 'feature-name' with the actual name of the feature you wish to enable. This allows testing of upcoming SDK capabilities.

```bash
npx shop-minis features --enable feature-name
```

--------------------------------

### Shopify Select Component - React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/select

Demonstrates the basic usage of the Shopify Select component. This component allows users to select an option from a dropdown list. It requires importing several components from '@shopify/shop-minis-react'. The output is a selectable dropdown.

```jsx
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<Select defaultValue="option-1">
<SelectTrigger>
<SelectValue placeholder="Select an option" />
</SelectTrigger>
<SelectContent>
<SelectItem value="option-1">Option 1</SelectItem>
<SelectItem value="option-2">Option 2</SelectItem>
<SelectItem value="option-3">Option 3</SelectItem>
</SelectContent>
</Select>
)
}
```

--------------------------------

### Shopify Card Component Implementation (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/card

Demonstrates the basic structure and usage of the Shopify Card component. This component is built using React and requires the '@shopify/shop-minis-react' library. It includes CardHeader, CardContent, and CardFooter for organizing information.

```jsx
import {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<Card>
<CardHeader>
<CardTitle>Card Title</CardTitle>
<CardDescription>Card description goes here</CardDescription>
</CardHeader>
<CardContent>
<p>This is the main content of the card.</p>
</CardContent>
<CardFooter>
<p>Card footer content</p>
</CardFooter>
</Card>
)
}
```

--------------------------------

### Implement AlertDialog with Customizable Actions

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/alertdialog

Demonstrates how to use the AlertDialog component from @shopify/shop-minis-react to create a confirmation dialog. It includes importing necessary components, defining a confirmation handler, and structuring the dialog with a trigger, content, header, title, description, and footer with cancel and action buttons. The action button executes a callback function upon click.

```javascript
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
 Button,
} from '@shopify/shop-minis-react'

export default function MyComponent() {
 const handleConfirm = () => {
 console.log('Confirmed')
 }

 return (
 <AlertDialog>
 <AlertDialogTrigger asChild>
 <Button variant="outline">Show Dialog</Button>
 </AlertDialogTrigger>
 <AlertDialogContent>
 <AlertDialogHeader>
 <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 <AlertDialogDescription>
 This action cannot be undone. This will permanently delete your
 account and remove your data from our servers.
 </AlertDialogDescription>
 </AlertDialogHeader>
 <AlertDialogFooter>
 <AlertDialogCancel>Cancel</AlertDialogCancel>
 <AlertDialogAction onClick={handleConfirm}>
 Continue
 </AlertDialogAction>
 </AlertDialogFooter>
 </AlertDialogContent>
 </AlertDialog>
 )
}
```

--------------------------------

### Shop Mini Scopes Configuration

Source: https://shopify.dev/docs/api/shop-minis/manifest-file

Specifies the user data your Shop Mini can access via the Shop Minis SDK. Certain SDK hooks require specific scopes to be declared in the manifest before use. Follow the principle of least privilege and only request necessary scopes.

```json
{
  "scopes": ["profile", "orders"]
}
```

--------------------------------

### Shopify Shop Minis React Progress Component Usage

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/progress

Demonstrates the basic usage of the Progress component from '@shopify/shop-minis-react'. This component is used to show completion status or loading progress. It takes a 'value' prop to indicate the current progress percentage.

```javascript
import {Progress} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return <Progress value={50} />
}
```

--------------------------------

### useCreateImageContent Hook API

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/usecreateimagecontent

This section details the useCreateImageContent hook, its return values, parameters for creating content, and the structure of the returned content objects.

```APIDOC
## useCreateImageContent Hook

### Description
The `useCreateImageContent` hook combines image upload with content creation to generate user-generated content entries. It handles the image upload pipeline and content entity creation in a single operation, automatically associating content with your Mini and integrating with Shop's content systems.

**Caution:** You must run the `setup` CLI command before using this hook so the content can be associated with the Mini.

### Method
This is a React hook, not an HTTP method.

### Returns
- **createImageContent** (`function`): An asynchronous function that uploads an image and creates content. It returns a Promise that resolves to an object containing the created `data` and any `userErrors`.
  - **Parameters**: Accepts a `CreateImageContentParams` object.
  - **Returns**: `Promise<{ data: Content; userErrors?: ContentCreateUserErrors[]; }>`
- **loading** (`boolean`): Indicates whether the content creation process is currently in progress.

### CreateImageContentParams
This interface defines the parameters required for the `createImageContent` function.

- **image** (`File`): The image file to upload.
- **contentTitle** (`string`): The title for the content entry.
- **visibility** (`ContentVisibility[] | null`): An optional array of visibility settings. Defaults to private if not provided.

### ContentVisibility Options
- **`DISCOVERABLE`**: Makes content eligible for Shop's recommendation and discovery systems.
- **`LINKABLE`**: Enables shareable URLs for the content.

### Content Object Structure
Represents a created content entry.

- **publicId** (`string`): The unique public identifier for the content.
- **externalId** (`string | null`): An optional external identifier.
- **image** (`ContentImage`): Information about the content's image.
- **title** (`string`): The title of the content.
- **description** (`string | null`): An optional description for the content.
- **visibility** (`ContentVisibility[]`): The visibility settings applied to the content.
- **shareableUrl** (`string | null`): The URL to share the content, if `LINKABLE` visibility is set.
- **products** (`ContentProduct[] | null`): An optional array of products associated with the content.
- **status** (`MinisContentStatus | null`): The current status of the content.

### ContentImage Object Structure
Provides details about the image associated with the content.

- **id** (`string | null`): The image's unique identifier.
- **url** (`string`): The URL of the image.
- **width** (`number | null`): The width of the image in pixels.
- **height** (`number | null`): The height of the image in pixels.
- **thumbhash** (`string | null`): A thumbhash representation of the image.
- **altText** (`string | null`): Alternative text for the image.

### ContentProduct Object Structure
Represents a product associated with the content.

- **id** (`string`): The product's unique identifier.
- **title** (`string`): The title of the product.
- **featuredImage** (`ContentImage | null`): Information about the product's featured image.

### MinisContentStatus Enum
Defines the possible statuses for content entries.

- **`PENDING`**: The content is awaiting processing.
- **`READY`**: The content is ready and publicly available (based on visibility settings).
- **`REJECTED`**: The content has been rejected.
```

--------------------------------

### Shopify Button Component - Default Usage

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/button

Demonstrates the basic usage of the Shopify Button component. It requires the '@shopify/shop-minis-react' library. The component accepts an onClick handler and child content for the button text.

```jsx
import {Button} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
  const handleClick = () => {
    console.log('Button pressed')
  }
  
  return <Button onClick={handleClick}>Continue</Button>
}
```

--------------------------------

### Generate API Key using Shopify CLI

Source: https://shopify.dev/docs/api/shop-minis/commands/api-keys-generate

Generates a new API key for your Mini to authenticate with Shop APIs. The generated key should be stored securely as it will not be shown again. Multiple keys can be used for different environments or rotated regularly for security.

```bash
npx shop-minis api-keys generate [options]
```

--------------------------------

### Badge Component Usage with Variants (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/badge

Demonstrates how to use the Badge component from '@shopify/shop-minis-react' with different visual variants. It requires React and the shop-minis-react library. The input is JSX, and the output is a set of styled badge elements.

```jsx
import React from 'react'
  
import {Badge} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<div className="flex flex-wrap gap-2">
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
</div>
)
}
  
```

--------------------------------

### List Report Dates using shop-minis CLI

Source: https://shopify.dev/docs/api/shop-minis/commands/reports-dates

This command lists available dates for a specified Shopify report type. It requires a `report-type` argument (e.g., CONTENT_IMPRESSIONS, SALES) and can optionally use the `--raw` flag to display dates without headers or formatting. Note that the most recent data may be 1-2 days old due to daily report generation and processing delays.

```bash
npx shop-minis reports dates [options] <report-type>
```

```bash
npx shop-minis reports dates --raw SALES
```

--------------------------------

### Programmatic Navigation with useNavigateWithTransition

Source: https://shopify.dev/docs/api/shop-minis/shop-minis/hooks/useNavigateWithTransition

Demonstrates basic usage of the useNavigateWithTransition hook for navigating to specific routes and back in the history. Requires @shopify/shop-minis-react. The hook returns a function that takes a route path or a history step (e.g., -1) as an argument.

```jsx
import {useNavigateWithTransition, Button} from '@shopify/shop-minis-react'

export default function MyComponent() {
  const transitionNavigate = useNavigateWithTransition()

  const handleProductClick = () => {
    transitionNavigate('/products/123')
  }

  const handleGoBack = () => {
    transitionNavigate(-1)
  }

  return (
    <>
      <Button onClick={handleProductClick}>View Product</Button>
      <Button onClick={handleGoBack}>Go Back</Button>
    </>
  )
}
```

--------------------------------

### Shopify Shop Minis React Alert Component - Default Variant

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/alert

This code snippet demonstrates how to use the default variant of the Alert component from '@shopify/shop-minis-react'. It displays a title and a description for general notifications. This component requires importing Alert, AlertTitle, and AlertDescription from the library.

```javascript
import {Alert, AlertTitle, AlertDescription} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <Alert variant="default">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using our SDK.
      </AlertDescription>
    </Alert>
  )
}
```

--------------------------------

### Shop Mini Trusted Domains Configuration

Source: https://shopify.dev/docs/api/shop-minis/manifest-file

Lists the external domains your Shop Mini is permitted to communicate with. This is a crucial security feature restricting network requests, image sources, video sources, and other external resources to approved domains only.

```json
{
  "trusted_domains": [
    "example.com",
    "api.example.com/v1"
  ]
}
```

--------------------------------

### QuantitySelector Component Usage (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/quantityselector

Demonstrates the basic implementation of the QuantitySelector component. It requires the 'QuantitySelector' import from '@shopify/shop-minis-react'. The component takes an initial quantity and a callback function to handle quantity changes, along with an optional maximum quantity.

```javascript
import {QuantitySelector} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
const handleQuantityChange = newQuantity => {
console.log('Quantity changed to:', newQuantity)
}
  
return (
<QuantitySelector
quantity={1}
onQuantityChange={handleQuantityChange}
maxQuantity={10}
/>
)
}
```

--------------------------------

### POST /createImageContent

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/useCreateImageContent

Creates image content using the Shopify Shop Minis API. This endpoint allows uploading an image and associating it with a title and visibility settings.

```APIDOC
## POST /createImageContent

### Description
Creates image content using the Shopify Shop Minis API. Allows uploading an image with a title and visibility settings.

### Method
POST

### Endpoint
/createImageContent

### Parameters
#### Request Body
- **image** (File) - Required - The image file to upload.
- **contentTitle** (string) - Required - The title for the content.
- **visibility** (array of strings) - Optional - Visibility settings for the content. Options include 'DISCOVERABLE', 'LINKABLE'. If null or empty, content is private.

### Request Example
```json
{
  "image": "file_content",
  "contentTitle": "My Awesome Photo",
  "visibility": ["DISCOVERABLE", "LINKABLE"]
}
```

### Response
#### Success Response (200)
- **data** (object) - The created content details.
- **userErrors** (array of ContentCreateUserErrors) - A list of errors encountered during creation.

#### Response Example
```json
{
  "data": {
    "id": "gid://shopify/MiniContent/12345",
    "title": "My Awesome Photo",
    "url": "https://cdn.shopify.com/path/to/image.jpg"
  },
  "userErrors": []
}
```

#### Error Response Example
```json
{
  "data": null,
  "userErrors": [
    {
      "code": "DUPLICATE_EXTERNAL_ID",
      "message": "An image with this external ID already exists."
    }
  ]
}
```
```

--------------------------------

### Advanced Navigation Options with useNavigateWithTransition

Source: https://shopify.dev/docs/api/shop-minis/shop-minis/hooks/useNavigateWithTransition

Illustrates advanced navigation techniques using `useNavigateWithTransition`, including replacing the current history entry with `{ replace: true }` and passing state data to the next route using the `state` option. It also shows conditional navigation based on a validation function.

```javascript
import React from 'react'
import {useNavigateWithTransition, Button} from '@shopify/shop-minis-react'

function AdvancedNavigation() {
  const navigateWithTransition = useNavigateWithTransition()

  const handleReplaceNavigation = () => {
    // Replace current history entry instead of pushing a new one
    navigateWithTransition('/login', { replace: true })
  }

  const handleNavigationWithState = () => {
    // Pass state data to the next page
    navigateWithTransition('/checkout', {
      state: {
        from: 'product-page',
        cartItems: 3,
        timestamp: Date.now()
      }
    })
  }

  const handleConditionalNavigation = async () => {
    try {
      const isValid = await validateSession()

      if (isValid) {
        // Navigate with both replace and state options
        navigateWithTransition('/dashboard', {
          replace: true,
          state: { authenticated: true }
        })
      } else {
        navigateWithTransition('/login')
      }
    } catch (error) {
      console.error('Navigation failed:', error)
    }
  }

  return (
    <div>
      <Button onPress={handleReplaceNavigation}>
        Login (Replace History)
      </Button>
      <Button onPress={handleNavigationWithState}>
        Checkout with State
      </Button>
      <Button onPress={handleConditionalNavigation}>
        Go to Dashboard
      </Button>
    </div>
  )
}

// Mock validation function
async function validateSession() {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(true), 100)
  })
}

export default AdvancedNavigation
```

--------------------------------

### ProductVariantPrice: With Discount

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/productvariantprice

Shows a product's price along with its original 'compare at' price to indicate a discount. Requires 'compareAtPriceAmount' prop.

```javascript
import {ProductVariantPrice} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <ProductVariantPrice
      amount="24.99"
      currencyCode="USD"
      compareAtPriceAmount="39.99"
    />
  )
}
```

--------------------------------

### Basic Accordion Usage with Shopify Shop-Minis-React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/accordion

Demonstrates the basic usage of the Accordion component from '@shopify/shop-minis-react'. This configuration allows only a single item to be open at a time and is collapsible. It imports Accordion, AccordionContent, AccordionItem, and AccordionTrigger.

```jsx
import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from '@shopify/shop-minis-react'

export default function MyComponent() {
return (
<Accordion type="single" collapsible>
<AccordionItem value="item-1">
<AccordionTrigger>Can I open multiple items?</AccordionTrigger>
<AccordionContent>
Yes, you can open multiple items at the same time with the multiple
type.
</AccordionContent>
</AccordionItem>
<AccordionItem value="item-2">
<AccordionTrigger>Is it customizable?</AccordionTrigger>
<AccordionContent>
Yes, you can customize the styling and behavior to match your needs.
</AccordionContent>
</AccordionItem>
</Accordion>
)
}

```

--------------------------------

### React RadioGroup Component - Basic Usage

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/radiogroup

Demonstrates the basic implementation of the RadioGroup component from '@shopify/shop-minis-react'. This component allows users to select a single option from a predefined list. It requires RadioGroupItem and Label components for functionality and display. The `defaultValue` prop sets the initially selected option.

```javascript
import {RadioGroup, RadioGroupItem, Label} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<RadioGroup defaultValue="option-1">
<div className="flex items-center space-x-2">
<RadioGroupItem value="option-1" id="option-1" />
<Label>Option 1</Label>
</div>
<div className="flex items-center space-x-2">
<RadioGroupItem value="option-2" id="option-2" />
<Label>Option 2</Label>
</div>
</RadioGroup>
)
}
```

--------------------------------

### Understanding the Auto-Generated Mini Handle

Source: https://shopify.dev/docs/api/shop-minis/manifest-file

The `handle` field serves as a unique identifier for your Mini within the Shop ecosystem. It is automatically assigned during Mini creation via the Shop Minis platform or CLI and is used for internal referencing and creating deep links to your Mini. It cannot be modified post-assignment.

```json
{
  "handle": "my-awesome-mini"
}
```

--------------------------------

### Shopify Shop Minis React Alert Component - Destructive Variant

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/alert

This code snippet shows how to implement the destructive variant of the Alert component from '@shopify/shop-minis-react'. This variant is typically used for error messages and warnings. It requires importing Alert, AlertTitle, and AlertDescription.

```javascript
import {Alert, AlertTitle, AlertDescription} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  )
}
```

--------------------------------

### ContentProduct Interface Definition

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/useCreateImageContent

Represents a product linked to content, including its ID, title, and featured image.

```typescript
export interface ContentProduct {
  id: string
  title: string
  featuredImage?: ContentImage | null
}
```

--------------------------------

### Interface for Secure Storage Return Values

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useSecureStorage

Defines the structure of the return object from the `useSecureStorage` hook. It includes methods for retrieving, setting, and removing secrets from secure storage, ensuring type safety for developers.

```typescript
interface UseSecureStorageReturns {
  /**
   * Get the secret from the secure storage.
   */
  getSecret: () => Promise<string | null>;
  /**
   * Set a secret in the secure storage.
   */
  setSecret: (params: SetSecretParams) => Promise<void>;
  /**
   * Remove the secret from the secure storage.
   */
  removeSecret: () => Promise<void>;
}
```

--------------------------------

### useImageUpload Hook - React

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useimageupload

The `useImageUpload` hook from '@shopify/shop-minis-react' enables image uploads. It returns an `uploadImage` function that takes an array of objects containing `mimeType` and `uri`, and returns a promise resolving to an array of `UploadedImage` objects. The uploaded images are automatically attached to the current user.

```javascript
import {useCallback} from 'react'

import {useImageUpload, Button} from '@shopify/shop-minis-react'

export default function MyComponent() {
  const {uploadImage} = useImageUpload()

  const handleUpload = useCallback(async () => {
    const result = await uploadImage([
      {
        mimeType: 'image/jpeg',
        uri: 'file://path/to/image.jpg',
      },
    ])
    console.log('Uploaded image:', result[0])
  }, [uploadImage])

  return <Button onClick={handleUpload}>Upload image</Button>
}
```

--------------------------------

### React Image Component: File from Image Picker

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/image

Illustrates how to display an image selected using `useImagePicker`. The component automatically manages the blob URL for the selected File object.

```javascript
import {useState} from 'react'
import {Image, useImagePicker, Button} from '@shopify/shop-minis-react'

export default function MyComponent() {
  const {openGallery} = useImagePicker()
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSelectImage = async () => {
    try {
      const file = await openGallery()
      setImageFile(file)
    } catch (error) {
      console.error('Failed to select image:', error)
    }
  }

  return (
    <>
      <Button onClick={handleSelectImage}>Select Image</Button>

      {imageFile && (
        <Image
          file={imageFile}
          alt="Selected image"
          className="w-full mt-4 rounded-lg"
        />
      )}
    </>
  )
}
```

--------------------------------

### Virtualized List with Pull-to-Refresh (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/list

This snippet illustrates the pull-to-refresh functionality integrated with the virtualized `List` component. Users can pull down from the top of the list to trigger a refresh action, allowing for dynamic content updates. This is useful for displaying live or frequently changing data.

```javascript
/*
 * This example focuses on demonstrating the pull-to-refresh concept.
 * A full implementation would require state management for updating the list
 * and potentially asynchronous data fetching.
 */

import {List} from '@shopify/shop-minis-react'

// Assume sampleItems and renderItem are defined as in the basic list example.
const sampleItems = [
  {id: '1', title: 'Item 1'},
  {id: '2', title: 'Item 2'},
  {id: '3', title: 'Item 3'},
]

const renderItem = item => (
  <div className="p-4 border-b">
    <span>{item.title}</span>
  </div>
)

export default function MyComponent() {
  // Function to handle the pull-to-refresh action
  const handleRefresh = () => {
    console.log('Refreshing list...')
    // In a real application, you would fetch new data here
    // and update the component's state.
    // Example: setNewItems(fetchNewData());
  }

  return (
    <List
      items={sampleItems}
      height={300}
      showScrollbar
      renderItem={renderItem}
      // The pullToRefresh prop is used to enable this functionality.
      // You would typically pass a function to handle the refresh event.
      pullToRefresh={{ onRefresh: handleRefresh }}
    />
  )
}
```

--------------------------------

### Outline Badge Styling (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/badge

Demonstrates the implementation of an outline styled Badge component using React and the '@shopify/shop-minis-react' library. This variant features a border for distinct visual separation.

```jsx
import {Badge} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return <Badge variant="outline">Outline</Badge>
}


```

--------------------------------

### Toaster Component: Basic Usage and Notification Display (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/toaster

Demonstrates the basic integration and usage of the Toaster component in a React application. It shows how to trigger success and error toast notifications using the `toast` object and includes the necessary imports from '@shopify/shop-minis-react'. The component requires `Toaster`, `Button`, and `toast` to be imported.

```javascript
import {Toaster, Button, toast} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
const handleClick = () => {
toast.success('Success toast!')
}
  
return (
<>
<Button onClick={handleClick}>
Show success Toast
</Button>
<Toaster />
</>
)
}
```

```javascript
import {Toaster, Button, toast} from '@shopify/shop-minis-react'

export default function MyComponent() {
  const handleClick = () => {
    toast.success('Success toast!')
  }

  return (
    <>
      <Button onClick={handleClick}>
        Show success Toast
      </Button>
      <Toaster />
    </>
  )
}
```

```javascript
import {Toaster, Button, toast} from '@shopify/shop-minis-react'

export default function MyComponent() {
  const handleClick = () => {
    toast.error('Error toast!')
  }

  return (
    <>
      <Button onClick={handleClick}>
        Show error Toast
      </Button>
      <Toaster />
    </>
  )
}
```

--------------------------------

### MinisContentStatus Enum

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/usecreateimagecontent

Defines the possible statuses for content within Minis. The statuses include PENDING, READY, and REJECTED, indicating the content's lifecycle state.

```typescript
export enum MinisContentStatus {
  PENDING = 'PENDING',
  READY = 'READY',
  REJECTED = 'REJECTED',
}
```

--------------------------------

### Check Submission Status CLI Command

Source: https://shopify.dev/docs/api/shop-minis/commands/check-submission

This command checks the review status of a submitted Shopify Mini. It displays the latest status (pending, testing, approved, rejected) and provides guidance on next steps. For rejected submissions, detailed feedback is sent via email. The --verbose flag can be used for debugging.

```bash
npx shop-minis check-submission [options]
```

```bash
npx shop-minis check-submission --verbose
```

--------------------------------

### Configure Trusted Domains for API Requests

Source: https://shopify.dev/docs/api/shop-minis/manifest-file

The `trusted_domains` field is a crucial security measure, specifying which external domains your Mini is permitted to make requests to. Ensure all necessary domains, including specific paths for resources, are listed to prevent runtime errors. This list is validated before submission for review.

```json
{
  "trusted_domains": [
    "api.example.com/v1",
    "storage.googleapis.com/my-mini-bucket",
    "cdn.example.com/assets"
  ]
}
```

--------------------------------

### UseImageUploadReturns Interface - TypeScript

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useimageupload

Defines the return type of the `useImageUpload` hook. It includes the `uploadImage` function, which takes an image file as input and returns a promise resolving to an array of `UploadedImage` objects.

```typescript
interface UseImageUploadReturns {
  /**
   * Upload an image which will be attached to the current user.
   */
  uploadImage: (image: File) => Promise<UploadedImage[]>
}
```

--------------------------------

### Run shop-minis doctor command

Source: https://shopify.dev/docs/api/shop-minis/commands/doctor

Executes the shop-minis doctor command to diagnose development issues. This command can be run with or without additional options like --fix or --verbose.

```shell
npx shop-minis doctor [options]
```

--------------------------------

### Render Accessible Text Label with Shopify Shop Minis React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/label

Demonstrates how to use the Label component from '@shopify/shop-minis-react' to render accessible text. This component is designed for simplicity and accessibility, requiring no additional dependencies beyond the library itself. The input is standard JSX, and the output is a rendered label element.

```jsx
import {Label} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return <Label>This is a text label</Label>
}
```

--------------------------------

### ContentCreateUserErrorCode

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/useCreateImageContent

Enumerates the possible error codes for user content creation failures.

```APIDOC
## ContentCreateUserErrorCode

### Description
Enumerates the possible error codes for user content creation failures.

### Enum Values
- **DUPLICATE_EXTERNAL_ID**: Indicates that a duplicate external ID was provided.
- **INELIGIBLE_PRODUCTS**: Indicates that the selected products are not eligible for content creation.

### Type Definition
```typescript
export enum ContentCreateUserErrorCode {
  DUPLICATE_EXTERNAL_ID = 'DUPLICATE_EXTERNAL_ID',
  INELIGIBLE_PRODUCTS = 'INELIGIBLE_PRODUCTS',
}
```
```

--------------------------------

### useCreateImageContent Hook Definition and Usage

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/usecreateimagecontent

Defines the useCreateImageContent hook's return type, including the createImageContent function and a loading state. The createImageContent function takes CreateImageContentParams and returns a Promise with content data or user errors. This hook combines image upload with content creation.

```typescript
interface UseCreateImageContentReturns {
  /**
   * Upload an image and create content.
   */
  createImageContent: (
    params: CreateImageContentParams
  ) => Promise<{data: Content; userErrors?: ContentCreateUserErrors[]}>
  /**
   * Whether the content is being created.
   */
  loading: boolean
}
```

--------------------------------

### React VideoPlayer: Imperative Controls

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/videoplayer

Shows how to implement imperative controls for the VideoPlayer component using a ref. This allows direct manipulation of playback functions like play and pause, useful for custom UI interactions or synchronized playback.

```jsx
import {useRef} from 'react'
import {VideoPlayer, Button, VideoPlayerRef} from '@shopify/shop-minis-react'

export default function MyComponent() {
  const handlePlay = () => {
    ref.current?.play()
  }

  const handlePause = () => {
    ref.current?.pause()
  }

  const ref = useRef<VideoPlayerRef>(null)

  return (
    <div>
      <VideoPlayer
        ref={ref}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        width={400}
        height={225}
      />
      <div style={{marginTop: '10px', display: 'flex', gap: '10px'}}>
        <Button onClick={handlePlay}>Play</Button>
        <Button onClick={handlePause} variant="secondary">
          Pause
        </Button>
      </div>
    </div>
  )
}
```

--------------------------------

### Shopify Shop Minis IconButton with Custom Icon and Click Handler

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/iconbutton

Shows how to use the IconButton component with a specific icon (Heart) and attach a click event handler. It also demonstrates the 'filled' state. Requires 'lucide-react' for icons and '@shopify/shop-minis-react' for the button.

```jsx
import { IconButton } from '@shopify/shop-minis-react'
import { Heart } from 'lucide-react'

export default function MyComponent() {
  const handleClick = () => {
    console.log('Icon button clicked')
  }

  return <IconButton Icon={Heart} filled onClick={handleClick} />
}
```

--------------------------------

### Shopify Button Component - Secondary Variant

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/button

Illustrates the usage of the secondary variant of the Shopify Button component, suitable for less prominent actions. It depends on the '@shopify/shop-minis-react' library and takes child content for the button text.

```jsx
import {Button} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return <Button variant="secondary">Cancel</Button>
}
```

--------------------------------

### List Available Report Dates

Source: https://shopify.dev/docs/api/shop-minis/commands/reports-dates

Retrieves a list of dates for which a specific report type has data available. All dates are returned in UTC. Note that the most recent data might be 1-2 days old due to processing delays.

```APIDOC
## GET /reports/dates

### Description
Lists available dates for a specific report type. Dates are returned in UTC. Useful for checking data availability before downloading reports.

### Method
GET

### Endpoint
/reports/dates

### Parameters
#### Query Parameters
- **report-type** (string) - Required - The type of report to check dates for (e.g., CONTENT_IMPRESSIONS, PRODUCT_IMPRESSIONS, SALES, USAGE_STATS).
- **--raw** (boolean) - Optional - If true, displays only the dates without headers or formatting.

### Request Example
```bash
npx shop-minis reports dates [options] <report-type>
```

### Response
#### Success Response (200)
- **dates** (array of strings) - A list of dates in YYYY-MM-DD format for which the report is available.

#### Response Example
```json
{
  "dates": [
    "2023-10-26",
    "2023-10-25",
    "2023-10-24"
  ]
}
```

#### Error Handling
- **400 Bad Request**: If the report-type is invalid or missing.
- **500 Internal Server Error**: If there is a server-side issue.
```

--------------------------------

### React VideoPlayer: Default Configuration

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/videoplayer

Demonstrates the basic usage of the VideoPlayer component with a source video and poster image. It sets a fixed width and enables muted playback. This is suitable for simple video embedding scenarios.

```jsx
import React from 'react'
  
import {VideoPlayer} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<VideoPlayer
src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
width={320}
muted
/>
)
}
```

--------------------------------

### ContentVisibility Type Definition

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/useCreateImageContent

Defines the possible visibility settings for content: DISCOVERABLE and LINKABLE.

```typescript
'DISCOVERABLE' | 'LINKABLE'
```

--------------------------------

### React List with Pull-to-Refresh using @shopify/shop-minis-react

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/list

This React component demonstrates how to implement a scrollable list with pull-to-refresh functionality using the 'List' component from '@shopify/shop-minis-react'. It manages the list items state and handles the refresh logic asynchronously. Dependencies include 'react' and '@shopify/shop-minis-react'. The component takes an array of items and configuration options for rendering and interaction.

```javascript
import {useState, useCallback} from 'react'
import {List} from '@shopify/shop-minis-react'

const initialItems = [
  {id: '1', title: 'Item 1'},
  {id: '2', title: 'Item 2'},
  {id: '3', title: 'Item 3'},
  {id: '4', title: 'Item 4'},
  {id: '5', title: 'Item 5'},
]

export default function MyComponent() {
  const [items, setItems] = useState(initialItems)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)

    await new Promise(resolve => setTimeout(resolve, 2000))

    const freshItems = [
      {id: Date.now().toString(), title: `Fresh Item ${Date.now()}`},
      {id: (Date.now() + 1).toString(), title: `Fresh Item ${Date.now() + 1}`},
    ]

    setItems([...freshItems, ...initialItems])
    setRefreshing(false)
  }, [])

  const getItemSize = () => 60

  const renderItem = item => (
    <div className="p-4 border-b">
      <span>{item.title}</span>
    </div>
  )

  return (
    <List
      items={items}
      height={300}
      itemSizeForRow={getItemSize}
      showScrollbar
      renderItem={renderItem}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      enablePullToRefresh
    />
  )
}
```

--------------------------------

### Skeleton Component Usage in React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/skeleton

Demonstrates how to use the Skeleton component from '@shopify/shop-minis-react' in a React application. This component is used to display placeholder elements during loading. It accepts a 'className' prop for styling dimensions and other CSS properties. No external dependencies beyond React and the library itself are required.

```jsx
import React from 'react'
  
import {Skeleton} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<div className="space-y-3">
<Skeleton className="h-12 w-full" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-1/2" />
</div>
)
}
```

--------------------------------

### UseSecureStorageReturns Interface Definition

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/usesecurestorage

Defines the return type for the `useSecureStorage` hook, outlining the available methods: `getSecret`, `setSecret`, and `removeSecret`, along with their respective return types and parameters.

```typescript
interface UseSecureStorageReturns {
  /**
   * Get the secret from the secure storage.
   */
  getSecret: () => Promise<string | null>
  /**
   * Set a secret in the secure storage.
   */
  setSecret: (params: SetSecretParams) => Promise<void>
  /**
   * Remove the secret from the secure storage.
   */
  removeSecret: () => Promise<void>
}
```

--------------------------------

### Shopify Button Component - Destructive Variant

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/button

Demonstrates how to implement the destructive variant of the Shopify Button component, intended for actions like deletion. This variant requires the '@shopify/shop-minis-react' library and accepts child content.

```jsx
import {Button} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return <Button variant="destructive">Delete</Button>
}
```

--------------------------------

### TypeScript Interface for Content Creation Errors

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/usecreateimagecontent

Defines the structure for error responses when creating user content. It includes an error code and a descriptive message.

```typescript
export interface ContentCreateUserErrors {
  code: ContentCreateUserErrorCode
  message: string
}
```

--------------------------------

### Display Images with Different Aspect Ratios using Shopify Shop Minis React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/image

This React component utilizes the '@shopify/shop-minis-react' Image component to display product images. It showcases how to set explicit aspect ratios (e.g., 1, '16/9', '3/4') and the default auto aspect ratio. CSS classes can be applied for styling.

```javascript
import {Image} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Square aspect ratio */}
      <Image
        src="https://cdn.shopify.com/example/product1.jpg"
        alt="Square image"
        aspectRatio={1}
        className="rounded-lg shadow-lg"
      />

      {/* 16:9 aspect ratio */}
      <Image
        src="https://cdn.shopify.com/example/product2.jpg"
        alt="Wide image"
        aspectRatio="16/9"
        className="rounded-lg shadow-lg"
      />

      {/* Portrait aspect ratio */}
      <Image
        src="https://cdn.shopify.com/example/product3.jpg"
        alt="Portrait image"
        aspectRatio="3/4"
        className="rounded-lg shadow-lg"
      />

      {/* Auto aspect ratio (default) */}
      <Image
        src="https://cdn.shopify.com/example/product4.jpg"
        alt="Auto aspect image"
        className="rounded-lg shadow-lg"
      />
    </div>
  )
}
```

--------------------------------

### Verify User Token Mutation (GraphQL)

Source: https://shopify.dev/docs/api/shop-minis/minis-admin-api/mutations/usertokenverify

This GraphQL mutation is used to verify a temporary user token. It accepts the token as input and returns the token's expiration date, the user's public ID, and any associated errors. The user state ('VERIFIED' or 'GUEST') is also returned.

```graphql
mutation VerifyUserToken($token: String!) {
  userTokenVerify(token: $token) {
    tokenExpiresAt
    publicId
    userErrors {
      code
      field
      message
    }
  }
}
```

--------------------------------

### Toggle Shopify Mini Feature (GraphQL Mutation)

Source: https://shopify.dev/docs/api/shop-minis/minis-admin-api/mutations/minitoggle

This GraphQL mutation allows enabling or disabling the Mini feature for partners. It requires a boolean `enable` argument and returns the updated `enabled` status. This is useful for managing partner tool visibility.

```graphql
mutation ToggleMini($enable: Boolean!) {
  miniToggle(enable: $enable) {
    enabled
  }
}
```

--------------------------------

### ProductVariantPrice: Default Display

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/productvariantprice

Displays a product's price with a specified amount and currency code. This is the basic usage of the component.

```javascript
import {ProductVariantPrice} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<ProductVariantPrice
amount="29.99"
currencyCode="USD"
/>
)
}
```

--------------------------------

### Secondary Badge Styling (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/badge

Illustrates how to render a secondary styled Badge component using React and the '@shopify/shop-minis-react' library. This variant provides muted styling for labels.

```jsx
import {Badge} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return <Badge variant="secondary">Secondary</Badge>
}


```

--------------------------------

### UploadedImage Interface - TypeScript

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useimageupload

Defines the structure of an uploaded image object returned by the `useImageUpload` hook. It includes the image `id`, optional `imageUrl`, and optional `resourceUrl`.

```typescript
export interface UploadedImage {
  /**
   * The ID of the uploaded image.
   */
  id: string
  /**
   * The URL of the uploaded image.
   */
  imageUrl?: string
  /**
   * The resource URL of the uploaded image.
   */
  resourceUrl?: string
}
```

--------------------------------

### CreateImageContentParams Interface

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/usecreateimagecontent

Defines the parameters required for the createImageContent function. It includes the image file, a content title, and optional visibility settings. The visibility parameter accepts an array of ContentVisibility enum values or null.

```typescript
interface CreateImageContentParams {
  image: File
  contentTitle: string
  visibility?: ContentVisibility[] | null
}
```

--------------------------------

### React Avatar Component Usage

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/avatar

Demonstrates how to use the Avatar component from '@shopify/shop-minis-react'. It includes an AvatarImage for the user's avatar source and an AvatarFallback for displaying initials when the image is unavailable. This component is primarily used in React applications.

```jsx
import {Avatar, AvatarFallback, AvatarImage} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <Avatar>
      <AvatarImage src="https://example.com/avatar.png" alt="my-avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
```

--------------------------------

### ContentCreateUserErrors

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/useCreateImageContent

Represents errors that can occur during content creation for users in Shopify Shop Minis.

```APIDOC
## ContentCreateUserErrors

### Description
Represents errors that can occur during content creation for users.

### Fields
- **code** (ContentCreateUserErrorCode) - The error code.
- **message** (string) - A descriptive message about the error.

### Type Definition
```typescript
export interface ContentCreateUserErrors {
  code: ContentCreateUserErrorCode
  message: string
}
```
```

--------------------------------

### ContentImage Interface

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/usecreateimagecontent

Defines the structure for image data associated with content. Includes URL, dimensions, alt text, and an ID. The 'id' and 'url' are crucial for identifying and displaying the image.

```typescript
export interface ContentImage {
  id?: string | null
  url: string
  width?: number | null
  height?: number | null
  thumbhash?: string | null
  altText?: string | null
}
```

--------------------------------

### Interface for Async Storage Return Values

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useAsyncStorage

Defines the structure of the return object from the `useAsyncStorage` hook, detailing the available methods for interacting with asynchronous storage.

```typescript
interface UseAsyncStorageReturns {
  /**
   * Get an item from the async storage.
   */
  getItem: (params: GetAsyncStorageItemParams) => Promise<string | null>
  /**
   * Set an item in the async storage.
   */
  setItem: (params: SetAsyncStorageItemParams) => Promise<void>
  /**
   * Remove an item from the async storage.
   */
  removeItem: (params: RemoveAsyncStorageItemParams) => Promise<void>
  /**
   * Get all keys in the async storage.
   */
  getAllKeys: () => Promise<string[]>
  /**
   * Clear all items from the async storage.
   */
  clear: () => Promise<void>
}
```

--------------------------------

### Accordion with Multiple Items Openable using Shopify Shop-Minis-React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/accordion

Shows how to configure the Accordion component to allow multiple items to be open simultaneously. This is achieved by setting the 'type' prop to 'multiple'. It utilizes Accordion, AccordionContent, AccordionItem, and AccordionTrigger from '@shopify/shop-minis-react'.

```jsx
import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from '@shopify/shop-minis-react'

export default function MyComponent() {
return (
<Accordion type="multiple">
<AccordionItem value="item-1">
<AccordionTrigger>Can I open multiple items?</AccordionTrigger>
<AccordionContent>
Yes, you can open multiple items at the same time with the multiple
type.
</AccordionContent>
</AccordionItem>
<AccordionItem value="item-2">
<AccordionTrigger>Is it customizable?</AccordionTrigger>
<AccordionContent>
Yes, you can customize the styling and behavior to match your needs.
</AccordionContent>
</AccordionItem>
</Accordion>
)
}

```

--------------------------------

### React TextInput Component Usage

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/textinput

Demonstrates how to import and use the Shopify TextInput component within a React application. This component is designed to keep the focused input field visible when the on-screen keyboard is active. It requires the '@shopify/shop-minis-react' package.

```jsx
import {TextInput} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return <TextInput placeholder="Enter your name" />
}
```

--------------------------------

### Content Object Structure

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/usecreateimagecontent

Represents the structure of a content object created by the hook. It includes properties like publicId, title, visibility, shareableUrl, and associated image data. The visibility property is an array of ContentVisibility enum values.

```typescript
export interface Content {
  publicId: string
  externalId?: string | null
  image: ContentImage
  title: string
  description?: string | null
  visibility: ContentVisibility[]
  shareableUrl?: string | null
  products?: ContentProduct[] | null
  status?: MinisContentStatus | null
}
```

--------------------------------

### ContentVisibility Enum

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/usecreateimagecontent

Defines the possible visibility settings for content. Content can be set as 'DISCOVERABLE' for appearing in recommendations, 'LINKABLE' for shareable URLs, or a combination of both. No values mean the content remains private.

```typescript
type ContentVisibility = 'DISCOVERABLE' | 'LINKABLE'
```

--------------------------------

### UserState Enum

Source: https://shopify.dev/docs/api/shop-minis/hooks/usegenerateusertoken

Defines the possible states for a user when generating a token, indicating whether the user is a guest or has been verified.

```typescript
export enum UserState {
  GUEST = 'GUEST',
  VERIFIED = 'VERIFIED',
}
```

--------------------------------

### Shopify Select Component with Grouped Options - React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/select

Illustrates how to create grouped options within the Shopify Select component. This enhances organization by categorizing related selectable items under labels. It requires additional imports for `SelectGroup` and `SelectLabel`. The output is a dropdown with distinct option groups.

```jsx
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <Select defaultValue="option-1">
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Group 1</SelectLabel>
          <SelectItem value="option-1">Option 1</SelectItem>
          <SelectItem value="option-2">Option 2</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Group 2</SelectLabel>
          <SelectItem value="option-3">Option 3</SelectItem>
          <SelectItem value="option-4">Option 4</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
```

--------------------------------

### Shopify Button Component - Disabled State

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/button

Shows how to render the Shopify Button component in a disabled state. This prevents user interaction and requires the '@shopify/shop-minis-react' library. It accepts child content for the button text.

```jsx
import {Button} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return <Button disabled>Continue</Button>
}
```

--------------------------------

### Interface for SetSecret Parameters

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useSecureStorage

Specifies the parameters required for the `setSecret` function within the `useSecureStorage` hook. It indicates that the `value` property, which is a string, is mandatory for setting a secret.

```typescript
export interface SetSecretParams {
  value: string;
}
```

--------------------------------

### User Token Verification Error Interface (TypeScript)

Source: https://shopify.dev/docs/api/shop-minis/minis-admin-api/mutations/usertokenverify

This TypeScript interface defines the structure of error objects returned by the `userTokenVerify` mutation. It includes a `code` for the error type, an optional `field` indicating the input that caused the error, and a descriptive `message`.

```typescript
export interface UserTokenVerifyUserError {
  /**
   * Error code associated with the error.
   */
  readonly code:
    | 'TOKEN_INVALID'
    | 'TOKEN_EXPIRED'
    | 'INVALID_MINI'
    | 'USER_NOT_FOUND'

  /**
   * Which input value this error came from.
   */
  readonly field?: (string | null)[]

  /**
   * A description of the error.
   */
  readonly message: string
}
```

--------------------------------

### TypeScript Enum for Content Creation Error Codes

Source: https://shopify.dev/docs/api/shop-minis/hooks/content/usecreateimagecontent

An enumeration representing specific error codes that can occur during user content creation. These codes help in identifying the exact nature of the failure.

```typescript
export enum ContentCreateUserErrorCode {
  DUPLICATE_EXTERNAL_ID = 'DUPLICATE_EXTERNAL_ID',
  INELIGIBLE_PRODUCTS = 'INELIGIBLE_PRODUCTS',
}
```

--------------------------------

### GeneratedTokenData Interface

Source: https://shopify.dev/docs/api/shop-minis/hooks/usegenerateusertoken

Represents the data returned when a user token is successfully generated. It includes the token itself, its expiration time, and the user's state (verified or guest).

```typescript
export interface GeneratedTokenData {
  /**
   * A temporary token for the user.
   */
  token?: string | null;
  /**
   * The expiration time of the token.
   */
  expiresAt?: ISO8601DateTime | null;
  /**
   * Whether the user is verified or a guest.
   */
  userState?: UserState | null;
}
```

--------------------------------

### User Token Verification API

Source: https://shopify.dev/docs/api/shop-minis/minis-admin-api/mutations/usertokenverify

Verifies a temporary user token to confirm the user's identity and session details. It returns information about the token's expiration, the user's public ID, and any errors encountered during verification.

```APIDOC
## POST /graphql

### Description
Verifies a temporary user token to confirm the user's identity and session details. It returns information about the token's expiration, the user's public ID, and any errors encountered during verification.

### Method
POST

### Endpoint
/graphql

### Parameters
#### Query Parameters
None

#### Request Body
##### userTokenVerify (mutation)
- **token** (String) - Required - The temporary user token to verify.

### Request Example
```json
{
  "query": "mutation VerifyUserToken($token: String!) { userTokenVerify(token: $token) { tokenExpiresAt publicId userErrors { code field message } } }",
  "variables": {
    "token": "YOUR_USER_TOKEN"
  }
}
```

### Response
#### Success Response (200)
- **data.userTokenVerify.tokenExpiresAt** (ISO8601DateTime | null) - The expiration date of the token.
- **data.userTokenVerify.publicId** (String | null) - The public ID of the user.
- **data.userTokenVerify.userErrors** (Array of UserTokenVerifyUserError) - List of errors that occurred while executing the mutation.

#### Error Response (4xx/5xx)
- **data.userTokenVerify.userErrors** (Array of UserTokenVerifyUserError) - Contains details about the error encountered.

### Response Example
```json
{
  "data": {
    "userTokenVerify": {
      "tokenExpiresAt": "2024-12-31T23:59:59Z",
      "publicId": "gid://shopify/User/12345",
      "userErrors": []
    }
  }
}
```

### UserTokenVerifyUserError
- **code** (String) - Error code associated with the error. Possible values: 'TOKEN_INVALID', 'TOKEN_EXPIRED', 'INVALID_MINI', 'USER_NOT_FOUND'.
- **field** (Array of String | null) - Which input value this error came from.
- **message** (String) - A description of the error.
```

--------------------------------

### Revoke API Key using Shopify CLI

Source: https://shopify.dev/docs/api/shop-minis/commands/api-keys-revoke

This command permanently revokes a specified API key. It's crucial to ensure that a replacement API key has been generated if the revoked key is still required for any Mini dependencies. This action cannot be undone.

```bash
npx shop-minis api-keys revoke
```

--------------------------------

### QuantitySelector with Custom Range (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/quantityselector

Illustrates setting custom minimum and maximum values for the QuantitySelector. The 'minQuantity' and 'maxQuantity' props allow for fine-grained control over the selectable range. The 'onQuantityChange' prop is used to capture user selections.

```javascript
import {QuantitySelector} from '@shopify/shop-minis-react'

export default function MyComponent() {
  const handleQuantityChange = newQuantity => {
    console.log('Quantity changed to:', newQuantity)
  }

  return (
    <QuantitySelector
      quantity={5}
      onQuantityChange={handleQuantityChange}
      minQuantity={2}
      maxQuantity={50}
    />
  )
}
```

--------------------------------

### UserTokenGenerateUserErrorCode Enum

Source: https://shopify.dev/docs/api/shop-minis/hooks/usegenerateusertoken

Lists the possible error codes that can occur during the user token generation process, such as when a mini or user is not found.

```typescript
export enum UserTokenGenerateUserErrorCode {
  MINI_NOT_FOUND = 'MINI_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}
```

--------------------------------

### UserTokenGenerateUserErrors Interface

Source: https://shopify.dev/docs/api/shop-minis/hooks/usegenerateusertoken

Defines the structure for error objects returned during user token generation. It includes an error code, a message, and an optional array of fields related to the error.

```typescript
export interface UserTokenGenerateUserErrors {
  code: UserTokenGenerateUserErrorCode;
  message: string;
  field?: string[] | null;
}
```

--------------------------------

### ImageContentWrapper with External ID - React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/imagecontentwrapper

Renders an image using a provided external ID. Similar to the publicId version, this component handles user-generated content and takes an externalId, width, height, a Loader component, and an onLoad callback. It's a flexible way to display external image sources.

```jsx
import React from 'react'
  
import {ImageContentWrapper, Skeleton} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<ImageContentWrapper
externalId="xyz123"
width={300}
height={200}
Loader={<Skeleton />}
onLoad={() => console.log('Image loaded')}
/>
)
}
```

--------------------------------

### SetSecretParams Interface Definition

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/usesecurestorage

Defines the parameter structure for the `setSecret` function within the `useSecureStorage` hook, specifying that it requires a `value` property of type string.

```typescript
export interface SetSecretParams {
  value: string
}
```

--------------------------------

### miniToggle Mutation

Source: https://shopify.dev/docs/api/shop-minis/minis-admin-api/mutations/minitoggle

Enables or disables the Mini feature by partner. This mutation accepts a boolean flag to toggle the Mini's state and returns the updated state.

```APIDOC
## POST /miniToggle

### Description
Enables or disables the Mini feature by partner. This mutation accepts a boolean flag to toggle the Mini's state and returns the updated state.

### Method
POST

### Endpoint
/miniToggle

### Parameters
#### Query Parameters
None

#### Request Body
- **enable** (Boolean) - required - The flag to enable or disable Mini.

### Request Example
```json
{
  "query": "mutation ToggleMini($enable: Boolean!) { miniToggle(enable: $enable) { enabled } }",
  "variables": {
    "enable": true
  }
}
```

### Response
#### Success Response (200)
- **enabled** (Boolean | null) - The flag whether the Mini is enabled or disabled.

#### Response Example
```json
{
  "data": {
    "miniToggle": {
      "enabled": true
    }
  }
}
```
```

--------------------------------

### Interface for useGenerateUserToken Hook Return Type

Source: https://shopify.dev/docs/api/shop-minis/hooks/usegenerateusertoken

Defines the structure of the return value from the useGenerateUserToken hook. It includes the generateUserToken function, which returns a promise resolving to token data or user errors.

```typescript
interface UseGenerateUserTokenReturns {
  /**
   * Generates a temporary token for the user.
   * Tokens are cached in memory and reused if still valid (with a 5-minute expiry buffer).
   * A new token is automatically generated when the cached token is expired or missing.
   */
  generateUserToken: () => Promise<{
    data: GeneratedTokenData;
    userErrors?: UserTokenGenerateUserErrors[];
  }>;
}
```

--------------------------------

### Disable a Specific Feature using shop-minis CLI

Source: https://shopify.dev/docs/api/shop-minis/commands/features

Disables a specific experimental or beta feature in your Shopify Mini. Replace 'feature-name' with the actual name of the feature you wish to disable. This is useful if a feature causes issues or is no longer needed for testing.

```bash
npx shop-minis features --disable feature-name
```

--------------------------------

### Shopify Checkbox Component - Disabled State (React)

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/checkbox

Shows how to render a Checkbox component in a disabled state using the 'disabled' prop. This prevents user interaction and indicates an unavailable option.

```javascript
import {Checkbox} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return <Checkbox disabled />
}
```

--------------------------------

### Interface for Setting an Async Storage Item

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useAsyncStorage

Defines the parameter object required for the `setItem` function within the `useAsyncStorage` hook, specifying the key and value of the item to set.

```typescript
export interface SetAsyncStorageItemParams {
  key: string
  value: string
}
```

--------------------------------

### ImageContentWrapper with Public ID - React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/imagecontentwrapper

Renders an image using a provided public ID. This component is intended for user-generated content and accepts a publicId, width, height, a Loader component, and an onLoad callback. It ensures proper handling and display of images uploaded through the useCreateImageContent hook.

```jsx
import React from 'react'
  
import {ImageContentWrapper, Skeleton} from '@shopify/shop-minis-react'
  
export default function MyComponent() {
return (
<ImageContentWrapper
publicId="xyz123"
width={300}
height={200}
Loader={<Skeleton />}
onLoad={() => console.log('Image loaded')}
/>
)
}
```

--------------------------------

### ProductVariantPrice: Custom Styling

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/productvariantprice

Applies custom CSS classes to the price display for both the current and original prices, as well as the overall component container. Uses 'currentPriceClassName', 'originalPriceClassName', and 'className' props.

```javascript
import {ProductVariantPrice} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <ProductVariantPrice
      amount="89.99"
      currencyCode="USD"
      compareAtPriceAmount="119.99"
      currentPriceClassName="text-2xl font-bold text-green-600"
      originalPriceClassName="text-lg text-red-500 line-through"
      className="gap-3 p-4 bg-gray-50 rounded-lg"
    />
  )
}
```

--------------------------------

### Cancel Shopify Submission using shop-minis CLI

Source: https://shopify.dev/docs/api/shop-minis/commands/cancel-submission

The 'cancel-submission' command allows you to cancel a pending or testing submission to Shopify. This is useful if you need to fix issues before review. It only works for submissions in 'pending' or 'testing' status. After cancelling, you can fix the issues and resubmit.

```bash
npx shop-minis cancel-submission [options]
```

--------------------------------

### React: Non-Collapsible Accordion with Shopify Shop Minis

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/accordion

This snippet shows a React component utilizing the Accordion, AccordionContent, AccordionItem, and AccordionTrigger from '@shopify/shop-minis-react'. The key prop `collapsible={false}` on the Accordion component ensures that once an accordion item is expanded, it cannot be collapsed by the user.

```jsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <Accordion type="single" collapsible={false}> 
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I collapse this?</AccordionTrigger>
        <AccordionContent>
          No. When you set the collapsible prop to false, the accordion is not collapsible.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

--------------------------------

### Interface for Removing an Async Storage Item

Source: https://shopify.dev/docs/api/shop-minis/hooks/storage/useAsyncStorage

Defines the parameter object required for the `removeItem` function within the `useAsyncStorage` hook, specifying the key of the item to remove.

```typescript
export interface RemoveAsyncStorageItemParams {
  key: string
}
```

--------------------------------

### React RadioGroup Component - Disabled State

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/radiogroup

Illustrates how to disable all options within a RadioGroup component. When disabled, user interaction is prevented, and the options are visually indicated as inactive. This is achieved by passing the `disabled` prop to the parent RadioGroup component. It also uses RadioGroupItem and Label components.

```javascript
import {RadioGroup, RadioGroupItem, Label} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <RadioGroup defaultValue="option-1" disabled>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="disabled-option-1" />
        <Label>Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="disabled-option-2" />
        <Label>Option 2</Label>
      </div>
    </RadioGroup>
  )
}
```

--------------------------------

### Shopify Disabled Select Component - React

Source: https://shopify.dev/docs/api/shop-minis/components/primitives/select

Shows how to disable the Shopify Select component, preventing user interaction. This is useful for scenarios where a selection is not currently possible or relevant. The `disabled` prop is added to the `Select` component. The output is a non-interactive dropdown.

```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shopify/shop-minis-react'

export default function MyComponent() {
  return (
    <Select defaultValue="option-1" disabled>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option-1">Option 1</SelectItem>
        <SelectItem value="option-2">Option 2</SelectItem>
        <SelectItem value="option-3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  )
}


```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.