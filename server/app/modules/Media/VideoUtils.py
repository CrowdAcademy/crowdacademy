import lzma


class VideoUtil:
    @staticmethod
    def compress_video(input_file, output_file):
        with open(input_file, 'rb') as f:
            data = f.read()
            with lzma.open(output_file, 'wb') as f_out:
                f_out.write(data)

    @staticmethod
    def decompress_video(input_file, output_file):
        with lzma.open(input_file, 'rb') as f:
            data = f.read()
            with open(output_file, 'wb') as f_out:
                f_out.write(data)
