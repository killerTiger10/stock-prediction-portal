import os
from django.conf import settings
import matplotlib.pyplot as plt

def save_plot(plot_img_path):
    img_path = os.path.join(settings.MEDIA_ROOT, plot_img_path)
    plt.savefig(img_path)
    plt.close()
    image_url = settings.MEDIA_URL + plot_img_path
    return image_url