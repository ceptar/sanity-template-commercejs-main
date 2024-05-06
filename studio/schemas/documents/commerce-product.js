import React from 'react'
import { Gift } from 'phosphor-react'

import { getIcon } from './filter'

/**
 * @description A product in your commerce store.
 */
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'], // disable for initial publish
  fieldsets: [
    {
      title: 'Commerce',
      name: 'commerce',
      description: 'Product data synced from Chec/Commerce.js',
      options: { columns: 2, collapsible: false }
    },
    {
      title: 'Product Cards',
      name: 'cards',
      description:
        'Define how this product should appear on category pages and the cart',
      options: { columns: 2 }
    }
  ],
  fields: [
    {
      title: 'Product name',
      name: 'productName',
      type: 'string',
      readOnly: true,
      fieldset: 'commerce'
    },
    {
      title: 'Product ID',
      name: 'productID',
      type: 'string',
      readOnly: true,
      fieldset: 'commerce'
    },
    {
      title: 'Price',
      name: 'price',
      type: 'string',
      readOnly: true,
      fieldset: 'commerce'
    },
    // {
    //   title: 'Compare Price (cents)',
    //   name: 'comparePrice',
    //   type: 'number',
    //   readOnly: true,
    //   fieldset: 'commerce'
    // },
    {
      title: 'Active mode',
      name: 'isActive',
      type: 'boolean',
      readOnly: true,
      description: 'Is the product is active?',
      // hidden: true,
      fieldset: 'commerce'
    },
    {
      title: 'In stock?',
      name: 'inStock',
      type: 'boolean',
      description: 'Is the product is in stock or has an inventory quantity?',
      readOnly: true,
      fieldset: 'commerce'
    },
    {
      title: 'Low Stock?',
      name: 'lowStock',
      type: 'boolean',
      description: 'Is the product at the low stock threshold of quantity 5?',
      readOnly: true,
      fieldset: 'commerce'
    },
    {
      title: 'SKU',
      name: 'sku',
      type: 'string',
      readOnly: true,
      fieldset: 'commerce'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'string',
      readOnly: true,
      fieldset: 'commerce'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      readOnly: true,
      fieldset: 'commerce',
    },
    {
      title: 'Variant groups',
      name: 'options',
      type: 'array',
      of: [{ type: 'productOption' }],
      readOnly: true,
      fieldset: 'commerce'
    },
    {
      title: 'Deleted from commerce?',
      name: 'wasDeleted',
      type: 'boolean',
      readOnly: true,
      hidden: true,
      fieldset: 'commerce'
    },
    {
      title: 'Display Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Gallery',
      name: 'galleryPhotos',
      type: 'array',
      of: [{ type: 'productGalleryPhotos' }],
      description:
        'Define a Gallery for your product, or for a subset of variants'
    },
    {
      title: 'Options Settings',
      name: 'optionSettings',
      type: 'array',
      of: [{ type: 'productOptionSettings' }],
      description: 'Define additional settings for product options'
    },
    {
      title: 'Filters',
      name: 'filters',
      type: 'array',
      description: 'Define what filters are associated with this product',
      of: [
        {
          title: 'Filter',
          name: 'filter',
          type: 'object',
          fields: [
            {
              title: 'Filter',
              name: 'filter',
              type: 'reference',
              to: [{ type: 'filter' }]
            },
            {
              title: 'Wich option is this for?',
              name: 'forOption',
              type: 'string',
              options: {
                list: [{ title: 'All', value: '' }],
                fromField: 'options',
                fromSubField: 'values',
                fromFieldData: {
                  title: 'name',
                  value: 'position'
                }
              }
            }
          ],
          preview: {
            select: {
              title: 'filter.title',
              type: 'filter.type',
              color: 'filter.color.color',
              forOption: 'forOption'
            },
            prepare({ title = 'Untitled', type, color, forOption }) {
              const displayType = type && type.trim() ? type : 'simple'
              const option = forOption ? forOption.split(':') : null

              return {
                title,
                subtitle:
                  option && option.length > 1
                    ? `${option[0]}: ${option[1]}`
                    : 'All Variants',
                media: getIcon(displayType, color?.hex.toUpperCase())
              }
            }
          }
        }
      ],
      options: {
        editModal: 'popover'
      },
      validation: Rule => Rule.unique()
    },
    {
      title: 'Use Galleries',
      name: 'useGallery',
      type: 'string',
      description:
        'Display an inline gallery instead of thumbnails for this product on category pages',
      options: {
        list: [
          { title: 'Yes', value: 'true' },
          { title: 'No', value: 'false' }
        ]
      },
      fieldset: 'cards'
    },
    {
      title: 'Surface Option',
      name: 'surfaceOption',
      type: 'string',
      description:
        'Surface one of the product options for this product on category pages',
      options: {
        list: [{ title: 'None', value: '' }],
        fromField: 'options',
        fromFieldData: { title: 'name', value: 'position' }
      },
      fieldset: 'cards'
    },
    {
      title: 'Listing Thumbnails',
      name: 'listingPhotos',
      type: 'array',
      of: [{ type: 'productListingPhotos' }],
      fieldset: 'cards'
    },
    {
      title: 'Cart Thumbnails',
      name: 'cartPhotos',
      type: 'array',
      of: [{ type: 'productCartPhotos' }],
      fieldset: 'cards'
    },
    {
      title: 'Overlay header with transparency?',
      name: 'hasTransparentHeader',
      type: 'boolean',
      description:
        'When activated the header will overlay the first content module with a transparent background and white text until scrolling is engaged.'
    },
    {
      title: 'Page Modules',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'productHero' },
        { type: 'grid' },
        { type: 'hero' },
        { type: 'marquee' },
        { type: 'dividerPhoto' }
      ],
      validation: Rule =>
        Rule.custom(blocks => {
          if (!blocks) return true

          const productHeros = blocks.filter(
            block => block._type === 'productHero'
          )

          const productHeroItems = productHeros.map(
            (item, index) => [{ _key: item._key }] || [index]
          )

          return productHeros.length === 1
            ? true
            : {
                message: 'You must have one "Product Hero" module on the page',
                paths: productHeroItems
              }
        })
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo'
    }
  ],
  initialValue: {
    useGallery: 'false',
    galleryPhotos: {
      _type: 'productGallery',
      forOption: ''
    },
    listingPhotos: {
      _type: 'productListingPhotos',
      forOption: ''
    },
    cartPhotos: {
      _type: 'productCartPhotos',
      forOption: ''
    }
  },
  preview: {
    select: {
      isActive: 'isActive',
      wasDeleted: 'wasDeleted',
      title: 'title',
      productName: 'productName',
      slug: 'slug',
      cartPhotos: 'cartPhotos',
      listingPhoto: 'listingPhoto'
    },
    prepare({
      isActive = true,
      wasDeleted = false,
      title,
      productName,
      slug = null,
      cartPhotos
    }) {
      const path = `/products/${slug}`
      return {
        title:
          (title ? title : productName) +
          (wasDeleted ? ' (removed)' : '') +
          (isActive ? ' (active)' : ''),
        media: cartPhotos?.length ? cartPhotos[0].cartPhoto : null,
        subtitle: slug ? path : '(missing slug)'
      }
    }
  }
}
