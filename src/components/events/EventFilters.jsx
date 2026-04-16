import { Input, Select, Button } from "../common";
import styles from "./EventFilters.module.css";

const categories = [
  { value: "", label: "All Categories" },
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "social", label: "Social" },
  { value: "sports", label: "Sports" },
  { value: "cultural", label: "Cultural" },
];

const sortOptions = [
  { value: "date", label: "Date (Soonest)" },
  { value: "-date", label: "Date (Latest)" },
  { value: "title", label: "Name (A-Z)" },
  { value: "-title", label: "Name (Z-A)" },
];

export default function EventFilters({
  search = "",
  category = "",
  sort = "date",
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClear,
}) {
  const hasFilters = search || category || sort !== "date";

  return (
    <div className={styles.filters}>
      <div className={styles.row}>
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.search}
        />

        <Select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          {categories.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {sortOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="small" onClick={onClear}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
