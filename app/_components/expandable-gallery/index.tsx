"use client";
import React, { useState } from "react";
import Modal from "../modal";
import ThumbnailSlider from "../thumbnail-slider";
import "./style.scss";

const ExpandableSet = ({ photos }: { photos: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [contentType, setContentType] = useState("");
  const [contentIndex, setContentIndex] = useState(0);

  const handleOpenModal = (content: string, type: string, index: number) => {
    setModalContent(content);
    setContentType(type);
    setContentIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="expandable-set">
        {photos.map((photo: any, index: number) => {
          const handleClick = () =>
            handleOpenModal(photo.baseUrl, photo.mimeType, index);

          if (photo.mimeType === "image/jpeg") {
            return (
              <img
                key={photo.id}
                src={photo.baseUrl}
                onClick={handleClick}
                alt="Photo"
              />
            );
          } else if (photo.mimeType === "video/mp4") {
            return (
              <video
                key={photo.id}
                src={`${photo.baseUrl}=dv`}
                controls
              ></video>
            );
          }
          return null;
        })}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        component={<ThumbnailSlider photos={photos} startIndex={contentIndex} />}
      />
    </div>
  );
};

const ExpandableGallery = ({
  photos,
  imagesPerRow,
}: {
  photos: any;
  imagesPerRow: number;
}) => {
  const rows = [];
  const imagesPerSet = 9;
  for (let i = 0; i < photos.length; i += imagesPerSet * imagesPerRow) {
    const rowSets = [];
    for (let j = i; j < i + imagesPerSet * imagesPerRow; j += imagesPerSet) {
      const photoSet = photos.slice(j, j + imagesPerSet);
      rowSets.push(<ExpandableSet key={j} photos={photoSet} />);
    }
    rows.push(
      <div key={i} className="gallery-row">
        {rowSets}
      </div>
    );
  }
  return <div className="gallery-section">{rows}</div>;
};

export default ExpandableGallery;
