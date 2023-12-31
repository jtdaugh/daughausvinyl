"use client";

/* Core */
import { useCallback, useState } from "react";

/* Instruments */
import {
  Release,
  useGetCollectionQuery,
  useGetWantlistQuery,
} from "@/app/api/discogs";

type ReleaseItemProps = {
  release: Release;
  selected: boolean;
  onClick: () => void;
};

export const ReleaseItem: React.FC<ReleaseItemProps> = ({
  release,
  selected,
  onClick,
}) => {
  const link = useCallback(() => {
    const releaseId = release.id;
    return `https://www.discogs.com/release/${releaseId}`;
  }, [release.id]);

  return (
    <div
      onClick={onClick}
      key={release.id}
      className={`cursor-pointer flex-item w-full aspect-square shadow-lg ${
        selected ? "selected" : ""
      }`}
      style={{
        backgroundImage: `url(${release.basic_information.cover_image}`,
        backgroundSize: "cover",
      }}
    >
      {selected && (
        <div className="w-full h-full bg-black/80 p-4 flex flex-col justify-center items-center">
          <div className="text-sm md:text-lg font-bold text-[#fff] font-serif text-center">
            {release.basic_information.title}
          </div>
          <div className="text-sm md:text-lg font-bold text-[#fff] font-serif text-center mt-3">
            {release.basic_information.artists[0].name}
          </div>
          <div className="mt-3">
            <span className="text-xs md:text-md text-[#eee] font-serif">
              {release.basic_information.year}
              {" · "}
            </span>
            <a
              href={link()}
              target="_blank"
              className="text-xs md:text-md text-[#eee] font-serif underline"
            >
              Link
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const Home = () => {
  const { data: collection } = useGetCollectionQuery();
  const { data: wants } = useGetWantlistQuery();
  const [selectedRelease, setSelectedRelease] = useState<number | null>(null);
  const [searchString, setSearchString] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const filteredCollection = collection?.releases
    .slice()
    .sort((a, b) =>
      a.basic_information.artists[0].name.localeCompare(
        b.basic_information.artists[0].name
      )
    )
    .filter(
      (release) =>
        release.basic_information.title
          .toLowerCase()
          .includes(searchString.toLowerCase()) ||
        release.basic_information.artists[0].name
          .toLowerCase()
          .includes(searchString.toLowerCase())
    );

  const filteredWants = wants?.wants
    .slice()
    .sort((a, b) =>
      a.basic_information.artists[0].name.localeCompare(
        b.basic_information.artists[0].name
      )
    )
    .filter(
      (release) =>
        release.basic_information.title
          .toLowerCase()
          .includes(searchString.toLowerCase()) ||
        release.basic_information.artists[0].name
          .toLowerCase()
          .includes(searchString.toLowerCase())
    );

  return (
    <div className="flex-1 w-full p-6 pt-2 max-w-[1600px] min-h-screen">
      <input
        type="text"
        value={searchString}
        onChange={handleSearchChange}
        placeholder="Search by artist or release title"
        className="w-full p-2 mb-6 border border-gray-300 rounded-md bg-gray-200"
      />
      <h1 className="text-3xl mb-3 text-[#eee] font-serif">
        Current Collection
      </h1>
      <div className="flex-row flex-wrap w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-6 gap-4">
        {filteredCollection?.map((release) => (
          <ReleaseItem
            release={release}
            selected={selectedRelease === release.id}
            onClick={() => {
              if (selectedRelease === release.id) {
                setSelectedRelease(null);
              } else {
                setSelectedRelease(release.id);
              }
            }}
          />
        ))}
        {filteredCollection?.length === 0 && (
          <div className="text-md md:text-xl text-[#ccc] font-serif">
            No results found
          </div>
        )}
      </div>
      <div className="inline-flex items-center justify-center w-full px-10">
        <hr className="w-full h-px my-10 bg-gray-400 border-0" />
      </div>
      <h1 className="text-3xl mb-3 text-[#eee] font-serif">Wishlist</h1>
      <div className="flex-row flex-wrap w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredWants?.map((release) => (
          <ReleaseItem
            release={release}
            selected={selectedRelease === release.id}
            onClick={() => {
              if (selectedRelease === release.id) {
                setSelectedRelease(null);
              } else {
                setSelectedRelease(release.id);
              }
            }}
          />
        ))}
        {filteredWants?.length === 0 && (
          <div className="text-md md:text-xl text-[#ccc] font-serif">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};
