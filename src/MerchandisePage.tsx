import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import merchandiseDataJson from "./merchData.json";
import "./merchandise-page.css";

type MerchProduct = {
  id: string;
  name: string;
  collection: string;
  price: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  image: string;
};
type MerchCollection = { title: string; products: MerchProduct[] };
type MerchandiseData = { collections: MerchCollection[] };

const merchandiseData = merchandiseDataJson as MerchandiseData;

function collectionAnchor(index: number) {
  return `merch-collection-${index + 1}`;
}

export default function MerchandisePage() {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<MerchProduct | null>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const visibleCollections = useMemo(() => {
    if (!normalizedQuery) return merchandiseData.collections;
    return merchandiseData.collections
      .map((collection) => ({
        ...collection,
        products: collection.products.filter((product) =>
          `${product.name} ${product.collection}`.toLocaleLowerCase().includes(normalizedQuery),
        ),
      }))
      .filter((collection) => collection.products.length > 0);
  }, [normalizedQuery]);

  const resultCount = useMemo(
    () => visibleCollections.reduce((count, collection) => count + collection.products.length, 0),
    [visibleCollections],
  );

  const suggestions = useMemo(() => {
    if (!selectedProduct) return [];
    const sameCollection = merchandiseData.collections.find((collection) => collection.title === selectedProduct.collection);
    return (sameCollection?.products ?? [])
      .filter((product) => product.id !== selectedProduct.id)
      .slice(0, 3);
  }, [selectedProduct]);

  useEffect(() => {
    if (!selectedProduct) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("merch-dialog-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("merch-dialog-open");
    };
  }, [selectedProduct]);

  return (
    <main className="merchandise-page" id="menu-content">
      <div className="merchandise-page-inner">
        <header className="merchandise-page-header">
          <h1>Merchandise</h1>
          <label className="merchandise-search">
            <Search size={19} aria-hidden="true" />
            <span className="merch-visually-hidden">Search merchandise</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search our merchandise"
            />
          </label>
        </header>

        {!normalizedQuery && (
          <nav className="merchandise-mobile-nav" aria-label="Merchandise collections">
            {merchandiseData.collections.map((collection, index) => (
              <a href={`#${collectionAnchor(index)}`} key={collection.title}>{collection.title}</a>
            ))}
          </nav>
        )}

        <div className="merchandise-layout">
          {!normalizedQuery && (
            <aside className="merchandise-sidebar" aria-label="Merchandise collections">
              <h2>Merchandise</h2>
              <ul>
                {merchandiseData.collections.map((collection, index) => (
                  <li key={collection.title}>
                    <a href={`#${collectionAnchor(index)}`}>{collection.title}</a>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className={`merchandise-main${normalizedQuery ? " is-searching" : ""}`}>
            {normalizedQuery && (
              <div className="merchandise-search-summary" aria-live="polite">
                <p className="merch-section-kicker">Search our merchandise</p>
                <h2>Results for “{query.trim()}”</h2>
                <p>{resultCount} {resultCount === 1 ? "item" : "items"} found</p>
              </div>
            )}

            {visibleCollections.length ? (
              <div className="merchandise-collections">
                {visibleCollections.map((collection) => {
                  const originalIndex = merchandiseData.collections.findIndex((item) => item.title === collection.title);
                  return (
                    <section
                      className="merchandise-collection"
                      id={collectionAnchor(originalIndex)}
                      key={collection.title}
                      aria-labelledby={`merch-heading-${originalIndex + 1}`}
                    >
                      <h2 id={`merch-heading-${originalIndex + 1}`}>{collection.title}</h2>
                      <div className="merchandise-product-grid">
                        {collection.products.map((product) => (
                          <button
                            className="merchandise-product-card"
                            type="button"
                            key={product.id}
                            onClick={() => setSelectedProduct(product)}
                            aria-label={`View details for ${product.name}`}
                          >
                            <span className="merchandise-product-image">
                              <img src={product.thumbnail} alt="" loading="lazy" />
                            </span>
                            <span className="merchandise-product-name">{product.name}</span>
                          </button>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className="merchandise-no-results">
                <Search size={24} aria-hidden="true" />
                <h2>No merchandise found</h2>
                <p>Try another search term, such as “tumbler,” “mug,” or “Bunny.”</p>
                <button type="button" onClick={() => setQuery("")}>Clear search</button>
              </div>
            )}

            <p className="merchandise-footer-note">Selection and availability may vary by store.</p>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div className="merchandise-modal-backdrop" role="presentation" onMouseDown={() => setSelectedProduct(null)}>
          <section
            className="merchandise-product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="merchandise-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="merchandise-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close merchandise details"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <img className="merchandise-modal-image" src={selectedProduct.image} alt="" />
            <div className="merchandise-modal-copy">
              <p className="merch-section-kicker">{selectedProduct.collection}</p>
              <h2 id="merchandise-modal-title">{selectedProduct.name}</h2>
              {selectedProduct.price && <p className="merchandise-price">₱{selectedProduct.price}</p>}
              {selectedProduct.subtitle && <p>{selectedProduct.subtitle}</p>}
              {selectedProduct.description && <p>{selectedProduct.description}</p>}
              <div className="merchandise-shop-note">
                <strong>Shop now</strong>
                <p>Marketplace checkout is not connected in this local preview.</p>
                <a href="/stores">Find a Store <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
              {suggestions.length > 0 && (
                <div className="merchandise-suggestions">
                  <h3>You may also like</h3>
                  <div>
                    {suggestions.map((product) => (
                      <button type="button" onClick={() => setSelectedProduct(product)} key={product.id}>
                        <img src={product.thumbnail} alt="" />
                        <span>{product.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
