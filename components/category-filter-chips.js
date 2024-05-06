import React, { useMemo } from 'react'

import Accordion from '@components/accordion'
import Chip from '@components/chip'
import Icon from '@components/icon'

const CategoryFilterChips = ({
  id,
  filterGroups,
  activeFilters,
  filtersTotal,
  onClick = () => {},
}) => {
  const activeFilterValues =
    activeFilters.flatMap((f) =>
      f.values.map((v) => ({
        name: f.name,
        value: v,
      }))
    ) || []

  const isOpen = useMemo(
    () => (filtersTotal > 0),
    [filtersTotal]
  )

  return (
    <div className="category--filter-chips is-inverted">
      <Accordion id={id} isOpen={isOpen} isControlled>
        <div className="chip-group">
          <ul className="chip-group--list">
            {activeFilterValues.map((filter, key) => {
              const currentValues =
                activeFilters.find((f) => f.name === filter.name)?.values || []

              const newValues = currentValues
                .filter((v) => v !== filter.value)
                .join()

              const option = filterGroups
                .find((f) => f.slug === filter.name)
                .options.find((o) => o.slug === filter.value)

              return (
                <Chip
                  key={key}
                  label={`Remove filter: ${option.title}`}
                  title={`Remove filter: ${option.title}`}
                  onClick={() =>
                    onClick([
                      {
                        name: filter.name,
                        value: newValues || null,
                      },
                    ])
                  }
                  icon={
                    <Icon
                      name="Plus"
                      id={option.slug}
                      className="remove-chip"
                    />
                  }
                >
                  {option.title}
                </Chip>
              )
            })}
          </ul>
        </div>
      </Accordion>
    </div>
  )
}

export default CategoryFilterChips
