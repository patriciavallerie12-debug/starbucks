import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Search, Shuffle, Star, X } from "lucide-react";
import menuDataJson from "./menuData.json";
import "./menu-page.css";

type MenuProduct = { id: string; name: string; image: string };
type MenuProductGroup = { title: string; products: MenuProduct[] };
type MenuCategory = { id: string; title: string; image: string; groups: MenuProductGroup[] };
type MenuSection = { title: string; categories: MenuCategory[] };
type MenuData = { allergenNotice: string; sections: MenuSection[] };

type SelectedProduct = {
  product: MenuProduct;
  section: string;
  category: string;
  group: string;
};

type NutritionVariant = {
  size: string;
  milk: string;
  whip: string;
  servingSize: string;
  totalWeightG: number;
  caloriesKcal: number;
  totalFatG: number;
  saturatedFatG: number;
  transFatG: number;
  cholesterolMg: number;
  sodiumMg: number;
  carbohydratesG: number;
  dietaryFiberG: number;
  totalSugarG: number;
  proteinG: number | null;
  sourcePage: number;
};

type NutritionProduct = {
  sourceProductName: string;
  matchNote?: string;
  variants: NutritionVariant[];
};

type MenuNutritionData = {
  source: { title: string; asOf: string; url: string; scope: string };
  pdri: { title: string; revision: string; url: string; scope: string };
  itemsByMenuId: Record<string, NutritionProduct>;
};

type NutritionChoice = { size: string; milk: string; whip: string };

const menuData = menuDataJson as MenuData;
const allCategories = menuData.sections.flatMap((section) => section.categories);
const curatedRecommendedSets = [
  ["137", "117", "351", "147", "215", "248"],
  ["127", "124", "144", "350", "211", "827"],
  ["130", "145", "326", "448", "220", "826"],
  ["129", "118", "150", "447", "216", "256"],
];
const allMenuProducts: SelectedProduct[] = menuData.sections.flatMap((section) =>
  section.categories.flatMap((category) =>
    category.groups.flatMap((group) =>
      group.products.map((product) => ({ product, section: section.title, category: category.title, group: group.title })),
    ),
  ),
);

function categoryAnchor(id: string) {
  return `menu-category-${id}`;
}

function uniqueOptions(values: string[]) {
  return [...new Set(values)];
}

function preferredOption(options: string[], preferred: string[]) {
  return preferred.find((option) => options.includes(option)) ?? options[0];
}

function formatNutritionValue(value: number | null) {
  if (value === null) return "Not listed";
  return new Intl.NumberFormat("en-PH", { maximumFractionDigits: 2 }).format(value);
}

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [recommendedSetIndex, setRecommendedSetIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);
  const [nutritionData, setNutritionData] = useState<MenuNutritionData | null>(null);
  const [nutritionLoading, setNutritionLoading] = useState(false);
  const [nutritionError, setNutritionError] = useState(false);
  const [nutritionChoice, setNutritionChoice] = useState<NutritionChoice | null>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) return menuData.sections;
    return menuData.sections
      .map((section) => ({
        ...section,
        categories: section.categories
          .map((category) => ({
            ...category,
            groups: category.groups
              .map((group) => ({
                ...group,
                products: group.products.filter((product) =>
                  `${product.name} ${category.title} ${group.title} ${section.title}`
                    .toLocaleLowerCase()
                    .includes(normalizedQuery),
                ),
              }))
              .filter((group) => group.products.length > 0),
          }))
          .filter((category) => category.groups.length > 0),
      }))
      .filter((section) => section.categories.length > 0);
  }, [normalizedQuery]);

  const resultCount = useMemo(
    () => filteredSections.reduce(
      (sectionCount, section) => sectionCount + section.categories.reduce(
        (categoryCount, category) => categoryCount + category.groups.reduce(
          (groupCount, group) => groupCount + group.products.length,
          0,
        ),
        0,
      ),
      0,
    ),
    [filteredSections],
  );

  const activeRecommendedIds = curatedRecommendedSets[recommendedSetIndex] ?? curatedRecommendedSets[0];
  const activeRecommendedProductIdSet = new Set(activeRecommendedIds);
  const recommendedPicks = activeRecommendedIds
    .map((id) => allMenuProducts.find((item) => item.product.id === id))
    .filter((item): item is SelectedProduct => item !== undefined);

  useEffect(() => {
    if (!selectedProduct) {
      setNutritionChoice(null);
      return;
    }

    let cancelled = false;
    setNutritionChoice(null);
    setNutritionLoading(true);
    setNutritionError(false);
    void import("./menuNutrition.json")
      .then((module) => {
        if (!cancelled) setNutritionData(module.default as MenuNutritionData);
      })
      .catch(() => {
        if (!cancelled) setNutritionError(true);
      })
      .finally(() => {
        if (!cancelled) setNutritionLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedProduct?.product.id]);

  useEffect(() => {
    if (!selectedProduct) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("menu-dialog-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-dialog-open");
    };
  }, [selectedProduct]);

  const selectedNutritionProduct = selectedProduct
    ? nutritionData?.itemsByMenuId[selectedProduct.product.id]
    : undefined;
  const nutritionVariants = selectedNutritionProduct?.variants ?? [];
  const defaultNutritionVariant =
    nutritionVariants.find((variant) => variant.size === "Tall" && variant.milk === "Whole" && (variant.whip === "Whip" || variant.whip === "N/A")) ??
    nutritionVariants.find((variant) => variant.size === "Tall" && variant.milk === "Whole") ??
    nutritionVariants.find((variant) => variant.size === "Tall" && variant.milk === "N/A") ??
    nutritionVariants.find((variant) => variant.size === "Tall") ??
    nutritionVariants.find((variant) => variant.milk === "Whole" && (variant.whip === "Whip" || variant.whip === "N/A")) ??
    nutritionVariants.find((variant) => variant.milk === "Whole") ??
    nutritionVariants[0];
  const nutritionSizeOptions = uniqueOptions(nutritionVariants.map((variant) => variant.size));
  const requestedNutritionSize = nutritionChoice?.size ?? defaultNutritionVariant?.size;
  const selectedNutritionSize = requestedNutritionSize && nutritionSizeOptions.includes(requestedNutritionSize)
    ? requestedNutritionSize
    : nutritionSizeOptions[0];
  const variantsAtSelectedSize = nutritionVariants.filter((variant) => variant.size === selectedNutritionSize);
  const nutritionMilkOptions = uniqueOptions(variantsAtSelectedSize.map((variant) => variant.milk));
  const requestedNutritionMilk = nutritionChoice?.milk;
  const selectedNutritionMilk = requestedNutritionMilk && nutritionMilkOptions.includes(requestedNutritionMilk)
    ? requestedNutritionMilk
    : preferredOption(
      nutritionMilkOptions,
      [defaultNutritionVariant?.milk ?? "", "Whole", "Nonfat", "Soy", "Oat", "Coconut", "N/A"],
    );
  const variantsAtSelectedMilk = variantsAtSelectedSize.filter((variant) => variant.milk === selectedNutritionMilk);
  const nutritionWhipOptions = uniqueOptions(variantsAtSelectedMilk.map((variant) => variant.whip));
  const requestedNutritionWhip = nutritionChoice?.whip;
  const selectedNutritionWhip = requestedNutritionWhip && nutritionWhipOptions.includes(requestedNutritionWhip)
    ? requestedNutritionWhip
    : preferredOption(nutritionWhipOptions, [defaultNutritionVariant?.whip ?? "", "Whip", "No Whip", "N/A"]);
  const activeNutritionVariant = variantsAtSelectedMilk.find((variant) => variant.whip === selectedNutritionWhip) ?? variantsAtSelectedMilk[0];
  const nutritionPending = nutritionLoading || (!nutritionData && !nutritionError);

  const updateNutritionSize = (size: string) => {
    const variantsAtSize = nutritionVariants.filter((variant) => variant.size === size);
    const milkOptions = uniqueOptions(variantsAtSize.map((variant) => variant.milk));
    const milk = milkOptions.includes(selectedNutritionMilk ?? "")
      ? selectedNutritionMilk ?? "N/A"
      : preferredOption(milkOptions, [defaultNutritionVariant?.milk ?? "", "Whole", "Nonfat", "Soy", "Oat", "Coconut", "N/A"]) ?? "N/A";
    const whipOptions = uniqueOptions(variantsAtSize.filter((variant) => variant.milk === milk).map((variant) => variant.whip));
    const whip = whipOptions.includes(selectedNutritionWhip ?? "")
      ? selectedNutritionWhip ?? "N/A"
      : preferredOption(whipOptions, [defaultNutritionVariant?.whip ?? "", "Whip", "No Whip", "N/A"]) ?? "N/A";
    setNutritionChoice({ size, milk, whip });
  };

  const updateNutritionMilk = (milk: string) => {
    const whipOptions = uniqueOptions(
      nutritionVariants
        .filter((variant) => variant.size === selectedNutritionSize && variant.milk === milk)
        .map((variant) => variant.whip),
    );
    const whip = whipOptions.includes(selectedNutritionWhip ?? "")
      ? selectedNutritionWhip ?? "N/A"
      : preferredOption(whipOptions, [defaultNutritionVariant?.whip ?? "", "Whip", "No Whip", "N/A"]) ?? "N/A";
    setNutritionChoice({ size: selectedNutritionSize ?? "", milk, whip });
  };

  return (
    <main className="menu-page" id="menu-content">
      <div className="menu-page-inner">
        <header className="menu-page-header">
          <h1>Menu</h1>
          <label className="menu-page-search">
            <Search size={19} aria-hidden="true" />
            <span className="menu-visually-hidden">Search the menu</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search our drinks, food, coffee beans"
            />
          </label>
        </header>

        <p className="menu-allergen-notice">{menuData.allergenNotice}</p>

        {!normalizedQuery && (
          <nav className="menu-mobile-nav" aria-label="Browse menu categories">
            {allCategories.map((category) => (
              <a href={`#${categoryAnchor(category.id)}`} key={category.id}>
                {category.title}
              </a>
            ))}
          </nav>
        )}

        <div className="menu-catalog-layout">
          {!normalizedQuery && (
            <aside className="menu-sidebar" aria-label="Menu categories">
              {menuData.sections.map((section) => (
                <div className="menu-sidebar-section" key={section.title}>
                  <h2>{section.title}</h2>
                  <ul>
                    {section.categories.map((category) => (
                      <li key={category.id}>
                        <a href={`#${categoryAnchor(category.id)}`}>{category.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>
          )}

          <div className={`menu-catalog-main${normalizedQuery ? " is-searching" : ""}`}>
            {!normalizedQuery && (
              <section className="menu-recommended-section" aria-labelledby="menu-recommended-heading">
                <div className="menu-recommended-heading">
                  <div>
                    <p className="menu-section-kicker">A few ideas for your next visit</p>
                    <h2 id="menu-recommended-heading">Recommended to try</h2>
                    <p>Curated picks across drinks and food to help you discover something new.</p>
                  </div>
                  <Star className="menu-recommended-heading-star" size={24} aria-hidden="true" />
                </div>
                <div className="menu-recommended-actions">
                  <span className="menu-recommended-set-status" aria-live="polite">
                    Mix {recommendedSetIndex + 1} of {curatedRecommendedSets.length}
                  </span>
                  <button
                    type="button"
                    className="menu-recommended-refresh"
                    onClick={() => setRecommendedSetIndex((index) => (index + 1) % curatedRecommendedSets.length)}
                  >
                    <Shuffle size={15} aria-hidden="true" />
                    <span>Show me different picks</span>
                  </button>
                </div>
                <div className="menu-product-grid menu-recommended-grid">
                  {recommendedPicks.map(({ product, section, category, group }) => (
                    <button
                      type="button"
                      className="menu-product-card menu-recommended-product"
                      key={`recommended-${product.id}`}
                      onClick={() => setSelectedProduct({ product, section, category, group })}
                      aria-label={`Recommended pick. More information about ${product.name}`}
                    >
                      <span className="menu-product-image">
                        <img src={product.image} alt="" loading="lazy" />
                        <span className="menu-recommended-badge">
                          <Star size={12} fill="currentColor" aria-hidden="true" /> Recommended
                        </span>
                      </span>
                      <span className="menu-product-name">{product.name}</span>
                      <span className="menu-recommended-category">{category}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {!normalizedQuery && (
              <div className="menu-category-overview">
                {menuData.sections.map((section) => (
                  <section className="menu-overview-section" key={section.title}>
                    <h2>{section.title}</h2>
                    <div className="menu-overview-grid">
                      {section.categories.map((category) => (
                        <a
                          className="menu-overview-card"
                          href={`#${categoryAnchor(category.id)}`}
                          key={category.id}
                        >
                          <img src={category.image} alt="" loading="lazy" />
                          <span>{category.title}</span>
                          <ChevronRight size={17} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {normalizedQuery && (
              <div className="menu-search-summary" aria-live="polite">
                <p className="menu-section-kicker">Search our menu</p>
                <h2>Results for “{query.trim()}”</h2>
                <p>{resultCount} {resultCount === 1 ? "item" : "items"} found</p>
              </div>
            )}

            {filteredSections.length > 0 ? (
              <div className="menu-product-sections">
                {filteredSections.map((section) => (
                  <div className="menu-product-section" key={section.title}>
                    {!normalizedQuery && <h2 className="menu-section-title">{section.title}</h2>}
                    {section.categories.map((category) => (
                      <section
                        className="menu-category-section"
                        id={categoryAnchor(category.id)}
                        key={category.id}
                        aria-labelledby={`menu-heading-${category.id}`}
                      >
                        <h3 id={`menu-heading-${category.id}`}>{category.title}</h3>
                        {category.groups.map((group) => {
                          const repeatedTitle = group.title.toLocaleLowerCase() === category.title.toLocaleLowerCase();
                          return (
                            <div className="menu-product-group" key={`${category.id}-${group.title}`}>
                              {!repeatedTitle && <h4>{group.title}</h4>}
                              <div className="menu-product-grid">
                                {group.products.map((product) => (
                                  <button
                                    type="button"
                                    className={`menu-product-card${activeRecommendedProductIdSet.has(product.id) ? " is-recommended" : ""}`}
                                    key={`${category.id}-${group.title}-${product.id}`}
                                    onClick={() => setSelectedProduct({ product, section: section.title, category: category.title, group: group.title })}
                                    aria-label={`${activeRecommendedProductIdSet.has(product.id) ? "Recommended pick. " : ""}More information about ${product.name}`}
                                  >
                                    <span className="menu-product-image">
                                      <img src={product.image} alt="" loading="lazy" />
                                      {activeRecommendedProductIdSet.has(product.id) && (
                                        <span className="menu-recommended-badge">
                                          <Star size={12} fill="currentColor" aria-hidden="true" /> Recommended
                                        </span>
                                      )}
                                    </span>
                                    <span className="menu-product-name">{product.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </section>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="menu-no-results">
                <Search size={24} aria-hidden="true" />
                <h2>No menu items found</h2>
                <p>Try another search term, like “latte,” “coffee,” or “cake.”</p>
                <button type="button" onClick={() => setQuery("")}>Clear search</button>
              </div>
            )}

            <p className="menu-footer-note">
              Menu availability may vary by store. Nutrition values are shown only for items with a verified match in the supplied Starbucks Philippines beverage sheet (as of 21 July 2026); listed size, milk, and whip options are shown without customizations. Food items and unmatched products are not estimated. The PDRI (2015; revised September 2018) is general daily guidance, not product data, so no % Daily Values are calculated. Sources: <a href="https://nutritionalinfo.rcoc.ph/FY26StarbucksPhilippinesBeverageNutrifacts-asofJuly21.pdf" target="_blank" rel="noreferrer">beverage nutrition sheet</a> · <a href="https://starbucks.ph/docs/PDRI-2018.pdf" target="_blank" rel="noreferrer">PDRI tables</a>.
            </p>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div className="menu-modal-backdrop" role="presentation" onMouseDown={() => setSelectedProduct(null)}>
          <section
            className="menu-product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-product-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="menu-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <img src={selectedProduct.product.image} alt="" />
            <div className="menu-product-modal-copy">
              <p className="menu-section-kicker">{selectedProduct.category}{selectedProduct.group !== selectedProduct.category ? ` · ${selectedProduct.group}` : ""}</p>
              <h2 id="menu-product-modal-title">{selectedProduct.product.name}</h2>
              <p>Nutrition values are shown only when the supplied official beverage sheet contains a verified entry for this item. Listed values are per serving and exclude customizations.</p>
              <section className="menu-nutrition-panel" aria-labelledby="menu-nutrition-heading">
                <div className="menu-nutrition-heading">
                  <h3 id="menu-nutrition-heading">Nutrition information</h3>
                  <span>Official source values</span>
                </div>

                {nutritionPending && <p className="menu-nutrition-status" role="status">Loading official nutrition information…</p>}
                {!nutritionPending && nutritionError && (
                  <p className="menu-nutrition-unavailable" role="status">We couldn’t load the supplied nutrition data just now. Please try reopening this item.</p>
                )}
                {!nutritionPending && !nutritionError && selectedNutritionProduct && activeNutritionVariant && (
                  <>
                    <p className="menu-nutrition-note">
                      Values are for the source-sheet listing “{selectedNutritionProduct.sourceProductName}.” Use the selectors to compare only the sizes and recipe options listed in that sheet; the initial view prefers Tall and Whole milk when available.
                    </p>
                    {selectedNutritionProduct.matchNote && <p className="menu-nutrition-match-note">{selectedNutritionProduct.matchNote}</p>}

                    {(nutritionSizeOptions.length > 1 || nutritionMilkOptions.length > 1 || nutritionWhipOptions.length > 1) && (
                      <div className="menu-nutrition-controls">
                        {nutritionSizeOptions.length > 1 && selectedNutritionSize && (
                          <label className="menu-nutrition-control">
                            <span>Size</span>
                            <select value={selectedNutritionSize} onChange={(event) => updateNutritionSize(event.currentTarget.value)}>
                              {nutritionSizeOptions.map((option) => <option value={option} key={option}>{option}</option>)}
                            </select>
                          </label>
                        )}
                        {nutritionMilkOptions.length > 1 && selectedNutritionMilk && (
                          <label className="menu-nutrition-control">
                            <span>Milk</span>
                            <select value={selectedNutritionMilk} onChange={(event) => updateNutritionMilk(event.currentTarget.value)}>
                              {nutritionMilkOptions.map((option) => <option value={option} key={option}>{option}</option>)}
                            </select>
                          </label>
                        )}
                        {nutritionWhipOptions.length > 1 && selectedNutritionWhip && (
                          <label className="menu-nutrition-control">
                            <span>Whip</span>
                            <select
                              value={selectedNutritionWhip}
                              onChange={(event) => setNutritionChoice({
                                size: selectedNutritionSize ?? "",
                                milk: selectedNutritionMilk ?? "",
                                whip: event.currentTarget.value,
                              })}
                            >
                              {nutritionWhipOptions.map((option) => <option value={option} key={option}>{option}</option>)}
                            </select>
                          </label>
                        )}
                      </div>
                    )}

                    <p className="menu-nutrition-serving">
                      <strong>Selected:</strong> {activeNutritionVariant.size}
                      {activeNutritionVariant.milk !== "N/A" ? ` · ${activeNutritionVariant.milk} milk` : ""}
                      {activeNutritionVariant.whip === "Whip" ? " · with whip" : activeNutritionVariant.whip === "No Whip" ? " · no whip" : ""}
                      {activeNutritionVariant.servingSize !== "N/A" ? ` · ${activeNutritionVariant.servingSize}` : ""}
                      {` · ${formatNutritionValue(activeNutritionVariant.totalWeightG)} g`}
                    </p>

                    <dl className="menu-nutrition-grid">
                      <div><dt>Calories</dt><dd>{formatNutritionValue(activeNutritionVariant.caloriesKcal)} <small>kcal</small></dd></div>
                      <div><dt>Total fat</dt><dd>{formatNutritionValue(activeNutritionVariant.totalFatG)} <small>g</small></dd></div>
                      <div><dt>Saturated fat</dt><dd>{formatNutritionValue(activeNutritionVariant.saturatedFatG)} <small>g</small></dd></div>
                      <div><dt>Trans fat</dt><dd>{formatNutritionValue(activeNutritionVariant.transFatG)} <small>g</small></dd></div>
                      <div><dt>Cholesterol</dt><dd>{formatNutritionValue(activeNutritionVariant.cholesterolMg)} <small>mg</small></dd></div>
                      <div><dt>Sodium</dt><dd>{formatNutritionValue(activeNutritionVariant.sodiumMg)} <small>mg</small></dd></div>
                      <div><dt>Carbohydrates</dt><dd>{formatNutritionValue(activeNutritionVariant.carbohydratesG)} <small>g</small></dd></div>
                      <div><dt>Dietary fiber</dt><dd>{formatNutritionValue(activeNutritionVariant.dietaryFiberG)} <small>g</small></dd></div>
                      <div><dt>Total sugar</dt><dd>{formatNutritionValue(activeNutritionVariant.totalSugarG)} <small>g</small></dd></div>
                      <div><dt>Protein</dt><dd>{activeNutritionVariant.proteinG === null ? "Not listed" : <>{formatNutritionValue(activeNutritionVariant.proteinG)} <small>g</small></>}</dd></div>
                    </dl>
                    <p className="menu-nutrition-source-note">Source: Starbucks Philippines beverage sheet, as of 21 July 2026. It does not list caffeine; protein is not included in the standard beverage tables.</p>
                  </>
                )}
                {!nutritionPending && !nutritionError && !selectedNutritionProduct && (
                  <p className="menu-nutrition-unavailable">
                    {selectedProduct.section === "Food"
                      ? "The supplied nutrition sheet covers beverages only, so it does not include verified values for this food item. No estimates are shown."
                      : selectedProduct.section === "At Home Coffee"
                        ? "The supplied beverage sheet does not include nutrition values for this at-home coffee item. No estimates are shown."
                        : "A verified nutrition row for this item was not found in the supplied beverage sheet. No values are estimated."}
                  </p>
                )}

                <div className="menu-nutrition-sources">
                  <span>Sources:</span>{" "}
                  <a href={nutritionData?.source.url ?? "https://nutritionalinfo.rcoc.ph/FY26StarbucksPhilippinesBeverageNutrifacts-asofJuly21.pdf"} target="_blank" rel="noreferrer">Starbucks PH beverage sheet</a>
                  <span> · </span>
                  <a href={nutritionData?.pdri.url ?? "https://starbucks.ph/docs/PDRI-2018.pdf"} target="_blank" rel="noreferrer">PDRI daily-reference tables</a>
                  <p>The PDRI is general dietary guidance—not per-item data. No % Daily Values are calculated.</p>
                </div>
              </section>
              <p className="menu-modal-disclaimer">We cannot guarantee that any of our products are free from allergens as we use shared equipment to store, prepare, and serve them.</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
