type ModelButtonsProps = {
  models: ReadonlyArray<{
    id: string;
    label: string;
  }>;
  loaderName: string | null;
};

export default function ModelButtons({ models, loaderName }: ModelButtonsProps) {
  return (
    <div className="dropzoneModels">
      {models.map(({ id, label }) => {
        const search = new URLSearchParams({ id });
        if (loaderName) {
          search.set("loader", loaderName);
        }

        return (
          <a key={id} href={`/?${search.toString()}`} className="dropzoneChooseButton">
            {label}
          </a>
        );
      })}
    </div>
  );
}
